import {dispatch} from '../../../../store';
import {messageEventCaught} from './index';

// TODO: determine if this function is still necessary
export function testEventHijacking(): string[] {
  const errors: string[] = [];

  const lockIcon = document.querySelector('keeper-lock');
  console.log('testEventHijacking lockIcon', lockIcon);

  // const fakeMessageEvent = new Event('message');
  // const fakeMessageEvent = new MessageEvent('successfulAutoFill', {
  //   data: {
  //     blah: 'whatever',
  //   }
  // });
  const fakeClickEvent = new Event('click');

  // if (lockIcon) lockIcon.dispatchEvent(fakeMessageEvent);
  if (lockIcon) lockIcon.dispatchEvent(fakeClickEvent);

  // if (lockIcon) errors.push(`Able to see Keeper Extension iframe\'s inner DOM node: keeper-lock`);

  return errors;
}

export function messageCallback(msg: any) {
  console.log('Event message hijacked. Message: ', msg);
  dispatch(messageEventCaught());
}
