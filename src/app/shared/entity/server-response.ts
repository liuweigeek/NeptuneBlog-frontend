export class ServerResponse<T> {

  status: number;
  msg: string;
  data: T;

  static createBySuccess(): ServerResponse<any> {
    const res = new ServerResponse();
    res.status = 0;
    return res;
  }

  static createBySuccessMsg(msg: string): ServerResponse<any> {
    const res = new ServerResponse<any>();
    res.status = 0;
    res.msg = msg;
    return res;
  }

  static createBySuccessData<T>(data: T): ServerResponse<T> {
    const res = new ServerResponse<T>();
    res.status = 0;
    res.data = data;
    return res;
  }

  static createBySuccessMsgAndData<T>(msg: string, data: T): ServerResponse<T> {
    const res = new ServerResponse<T>();
    res.status = 0;
    res.msg = msg;
    res.data = data;
    return res;
  }

  static createByError(): ServerResponse<any> {
    const res = new ServerResponse<any>();
    res.status = 1;
    return res;
  }

  static createByErrorMsg(msg: string): ServerResponse<any> {
    const res = new ServerResponse<any>();
    res.status = 1;
    res.msg = msg;
    return res;
  }

  static createByErrorData<T>(data: T): ServerResponse<T> {
    const res = new ServerResponse<T>();
    res.status = 1;
    res.data = data;
    return res;
  }

  static createByErrorMsgAndData<T>(msg: string, data: T): ServerResponse<T> {

    const res = new ServerResponse<T>();
    res.msg = msg;
    res.data = data;
    return res;
  }

  isSuccess(): boolean {
    return this.status === 0;
  }
}
