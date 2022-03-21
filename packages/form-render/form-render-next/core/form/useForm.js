import Form from '.';

export default function useForm(...args) {
  return new Form(...args);
}

const form = useForm({
  onTrigger(changedSets) {
    console.log('===> onTrigger', changedSets);
  },
})

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
      ],
      "default": 123,
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

setTimeout(() => {
  form._setData({
    input: 123,
  })
})