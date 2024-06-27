declare namespace BaseForm {
  //表单每一项的配置选项
  interface FormOptions {
    //表单项显示的元素
    type?:
      | "cascader"
      | "checkbox"
      | "checkbox-group"
      | "checkbox-button"
      | "color-picker"
      | "date-picker"
      | "input"
      | "input-number"
      | "radio"
      | "radio-group"
      | "radio-button"
      | "rate"
      | "select"
      | "option"
      | "slider"
      | "switch"
      | "time-picker"
      | "time-select"
      | "transfer"
      | "upload"
      | "editor"
      | "tree-select"
      | "title"
      | "text"
      | "index"
      | "selection";
    // 表单项的值
    value?: any;
    // 表单label
    label?: string;
    labelWidth?: string;
    // 表单的标识
    prop?: string;
    required?: boolean;
    show?: boolean;
    // 表单验证规则
    rules?: RuleItem[];
    // 表单的占位符
    placeholder?: string;
    //表单特有的元素
    attrs?: {
      style?: CSSProperties;
      clearable?: boolean;
      showPassword?: boolean;
      disabled?: any;
      colProp?: any;
      options?: any[] | any; // 使用ref响应式时传值为xxx.value提示类型错误
      data?: any;
      lazy?: boolean;
      [key: string]: any;
    };
    columnAttrs?: { [key: string]: any };
    events?: { [key: string]: any };
    render?: any;
    dictType?: string;
    //表单项的子元素
    children?: any[] | Ref<any[]>;
    //处理长传组件的属性和方法
    uploadAttrs?: {
      action: string;
      headers?: object;
      method?: "post" | "get" | "patch";
      multiple?: boolean;
      data?: any;
      name?: string;
      withCredentials?: boolean;
      showFileList?: boolean;
      drag?: boolean;
      accpet?: string;
      thumbnailMode?: boolean;
      fileList?: any[];
      ListType?: "text" | "picture" | "picture-card";
      autoUpload?: boolean;
      disabled?: boolean;
      limit?: number;
    };
  }
  interface ValidateFieldCallback {
    (message?: string, invalidFields?: ValidateFieldsError): void;
  }

  interface FormInstance {
    registerLabelWidth(width: number, oldWidth: number): void;
    deregisterLabelWidth(width: number): void;
    autoLabelWidth: string | undefined;
    emit: (evt: string, ...args: any[]) => void;
    labelSuffix: string;
    inline?: boolean;
    model?: Record<string, unknown>;
    size?: string;
    showMessage?: boolean;
    labelPosition?: string;
    labelWidth?: string;
    rules?: Record<string, unknown>;
    statusIcon?: boolean;
    hideRequiredAsterisk?: boolean;
    disabled?: boolean;
    validate: (callback?: Callback) => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (props?: string | string[]) => void;
    validateField: (
      props: string | string[],
      cb: ValidateFieldCallback
    ) => void;
  }
}
