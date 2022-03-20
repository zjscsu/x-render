import BaseForm from "./base";
import Proxy from '../proxy';
import { generateDataSkeleton } from '../utils';

export default class Form extends BaseForm{
  constructor(props = {}) {
    super(props)
    this._initObserve()
  }

  _initObserve() {
    this.observe(() => {
      let currentData = {};
      if(this.schema) {
        currentData = generateDataSkeleton(this.schema, this.props.formData)
      };
      this.formData = currentData;
    }, [
      Proxy.reflect(this.namespace.props, 'formData'),
      Proxy.reflect(this.namespace.context, 'schema'),
    ])
  }

  syncStuff({
    schema,
    locale,
    validateMessages,
    beforeFinish,
    removeHiddenData,
  }) {
    this.schema = schema;
    this.locale = locale;
    this.validateMessages = validateMessages;
    this.beforeFinish = beforeFinish;
    this.removeHiddenData = removeHiddenData;
  }
}

const form = new Form();

const schema = {
  "type": "object",
  "properties": {
    "input": {
      "title": "简单输入框",
      "type": "string",
      "min": 6,
      "value": 123,
      "rules": [
        {
          "pattern": "^[A-Za-z0-9]+$",
          "message": "只允许填写英文字母和数字"
        }
      ]
    },
    "select": {
      "title": "单选",
      "type": "string",
      "enum": [
        "a",
        "b",
        "c"
      ],
      "enumNames": [
        "选项1",
        "选项2",
        "选项3"
      ],
      "widget": "radio"
    }
  }
};

setTimeout(() => {
  form.syncStuff({
    schema,
  })
}, 300)

form.syncProps({
  formData: {
    input: 123,
  }
})