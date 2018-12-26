export default {
  name: 'wrapperDatepicker',
  props: {
    label: {
      default: '',
      type: String,
    },
    lang: {
      default: 'en',
      type: String,
    },
    placeholder: {
      default: 'datepicker',
      type: String,
    },
    id: {
      default: 'datepicker',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    value: {
      default: null,
    },
    inlineBlock: {
      default: '',
      type: String,
    },
    options: {
      default: null,
      type: Object,
    },
    range: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
