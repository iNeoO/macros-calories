import vautocomplete from 'v-autocomplete';
import 'v-autocomplete/dist/v-autocomplete.css';

export default {
  name: 'wrapperTypeHead',
  props: {
    label: {
      default: '',
      type: String,
    },
    inputClass: {
      default: '',
      type: String,
    },
    value: {
      default: null,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    inlineBlock: {
      default: '',
      type: String,
    },
    inputAttrs: {
      default: () => ({
        class: 'input-blue uk-input',
      }),
      type: Object,
    },
    id: {
      default: 'typeHead',
      type: String,
    },
    componentItem: {
      required: true,
    },
    items: {
      default: () => [],
      type: Array,
    },
    getLabel: {
      type: Function,
      default: item => item,
    },
    autoSelectOneItem: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeHeadValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    updateItems(text) {
      this.$emit('update-items', text);
    },
  },
  components: {
    vautocomplete,
  },
};
