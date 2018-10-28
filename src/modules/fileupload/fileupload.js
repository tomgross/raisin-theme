/*!
 * Fileupload
 *
 * @author
 * @copyright
 */
import EstaticoModule from '../../assets/js/helpers/module';
import namespace from '../../assets/js/helpers/namespace';
import WindowEventListener from '../../assets/js/helpers/events';
import('whatwg-fetch');

class Fileupload extends EstaticoModule {
  constructor($element, data, options) {
    const defaultData = {
    };
    const defaultOptions = {
      domSelectors: {
        // item: '[data-${{{className}}.name}="item"]'
        form: 'form[class="box"]',
        input: 'input[name="files[]"]',
        upload: 'div.m-fileupload'
      },
      stateClasses: {
        hasAdvancedUpload: 'has-advanced-upload'
      },
    };

    super($element, defaultData, defaultOptions, data, options);

    this.droppedFiles = false;
    this.initUi();
    this.initEventListeners();

    this.show();
  }

  static get events() {
    return {
      // eventname: `eventname.${ Fileupload.name }.${  }`
    };
  }

  show() {
    this.ui.element.dispatchEvent(new CustomEvent(Fileupload.events.fileupload, {}));
  }

  isAdvancedUpload() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }

  /**
   * Initialisation of variables, which point to DOM elements
   */
  initUi() {
    // DOM element pointers

  }

  /**
   * Event listeners initialisation
   */
  initEventListeners() {
    // Event listeners
    if (this.isAdvancedUpload()) {
      this.ui.element.classList.add(this.options.stateClasses.hasAdvancedUpload);


      this.eventDelegate
        .on('dragenter', this.options.domSelectors.upload, (event) => {
        event.preventDefault();
      event.stopPropagation();
        this.ui.element.classList.add('is-dragover');
      })
    .on('dragover', this.options.domSelectors.upload, (event) => {
        event.preventDefault();
      event.stopPropagation();
        this.ui.element.classList.add('is-dragover');
    })
      .on('dragleave', this.options.domSelectors.upload, (event) => {
        event.preventDefault();
      event.stopPropagation();
        this.ui.element.classList.remove('is-dragover');
      })
        .on('dragend', this.options.domSelectors.upload, (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.ui.element.classList.remove('is-dragover');
        })
    .on('drop', this.options.domSelectors.upload, (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.droppedFiles = event.dataTransfer.files;
        this.ui.element.classList.remove('is-dragover');
    })
    .on('submit', this.options.domSelectors.form, (event, form) => {
        if (form.classList.contains('is-uploading')) return false;

      form.classList.add('is-uploading');
      form.classList.remove('is-error');

      if (this.isAdvancedUpload()) {
        // ajax for modern browsers

        event.preventDefault();

        var ajaxData = new FormData(form);
        console.debug(ajaxData);

        if (this.droppedFiles) {
          for (var file of this.droppedFiles) {
            var input = this.ui.element.querySelector(this.options.domSelectors.input);
            ajaxData.append( input.getAttribute('name'), file );
          }
        }

        fetch(form.getAttribute('action'), {
          method: form.getAttribute('method'),
          body: ajaxData
        }).then(function (resp) {
          console.log(resp);
          form.classList.remove('is-uploading');
          form.classList.add( resp.ok == true ? 'is-success' : 'is-error' );

        }).catch(function (err) {
          console.error('Noo! Uploading error occured.')

        })

/*

        $.ajax({
          url: form.attr('action'),
          type: form.attr('method'),
          data: ajaxData,
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          complete: function() {
            form.classList.remove('is-uploading');
          },
          success: function(data) {
            form.classList.add( data.success == true ? 'is-success' : 'is-error' );
            if (!data.success) $errorMsg.text(data.error);
          },
          error: function() {
            // Log the error, show an alert, whatever works for you
          }
        });
*/
      } else {
        // ajax for legacy browsers
      }
    });
    }
  }

  /**
   * Unbind events, remove data, custom teardown
   */
  destroy() {
    super.destroy();

    // Custom destroy actions go here
  }
}

export default Fileupload;
