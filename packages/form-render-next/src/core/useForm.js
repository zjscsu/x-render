import Form from './form';
import Store from './store';

// 用来存放表单对象
const formStore = Store.create();

export {
  formStore,
}

export default function useForm(options) {
  const { id, useStore: defaultUseStore } = options;
  const form = new Form(options);
  
  let useStore = defaultUseStore;
  // 小程序的对象在传输过程中会被序列化，导致无法传递方法，因此小程序场景默认开启全局，除非明确指定不需要全局保存
  if (typeof window === 'undefined' && defaultUseStore === undefined ) {
    useStore = true;
  }

  if(useStore) {
    if(!id) throw new Error(`id is required when create Form instance in mini program, accept: ${options?.id}`);
    formStore.setItem(id, form);
    form.store = formStore;
  }

  return form;
}
