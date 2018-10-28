/*!
 * Editor
 *
 * @author
 * @copyright
 */
import EstaticoModule from '../../assets/js/helpers/module';
import namespace from '../../assets/js/helpers/namespace';
import SirTrevor from '../../../node_modules/sir-trevor';

class Editor extends EstaticoModule {
  constructor($element, data, options) {
    const defaultData = {
    };
    const defaultOptions = {
      domSelectors: {
        // item: '[data-${{{className}}.name}="item"]'
      },
      stateClasses: {
        // activated: 'is-activated'
      },
    };

    super($element, defaultData, defaultOptions, data, options);

    this.initUi();
    this.initEventListeners();
  }

  static get events() {
    return {
      // eventname: `eventname.${ Editor.name }.${  }`
    };
  }

  /**
   * Initialisation of variables, which point to DOM elements
   */
  initUi() {
    // DOM element pointers
    SirTrevor.setDefaults({
      iconUrl: '../../assets/media/svgsprite/sir-trevor-icons.svg'
    });


    var editor = new SirTrevor.Editor({
      el: document.querySelector('.js-st-instance'),
      defaultType: 'Text',
    });
  }

  /**
   * Event listeners initialisation
   */
  initEventListeners() {
    // Event listeners
  }

  /**
   * Unbind events, remove data, custom teardown
   */
  destroy() {
    super.destroy();

    // Custom destroy actions go here
  }
}

export default Editor;
