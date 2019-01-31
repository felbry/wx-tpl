Component({
  externalClasses: ['i-class', 'i-class-body', 'i-class-footer'],

  options: {
    multipleSlots: true
  },

  properties: {
    full: {
      type: Boolean,
      value: false
    },
    thumb: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    }
  }
})
