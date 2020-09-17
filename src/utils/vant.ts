//vant组件的常用方法
import {Notify, Dialog} from 'vant';

/**
 * 错误警告
 * @param msg
 * @param time
 */
function errorMsg(msg: string = '失败', time: number = 3000) {
    Notify({
        type: 'danger',
        message: msg,
        duration: time
    });
}

/**
 * 成功提示
 * @param msg
 * @param time
 */
function successMsg(msg: string = '成功', time: number = 3000) {
    Notify({
        type: 'success',
        message: msg,
        duration: time
    });
}

/**
 * 弹窗
 * @param title
 * @param message
 * @param theme
 * @param confirmButtonText
 * @param confirmButtonColor
 * @param overlay
 * @param closeOnClickOverlay
 * @param lockScroll
 * @param allowHtml
 * @param confirm
 */
function alert(
    {
        title = '提示',
        message = '',
        theme = 'round',
        confirmButtonText = '确认',
        confirmButtonColor = '#ee0a24',
        overlay = true,
        closeOnClickOverlay = false,
        lockScroll = true,
        allowHtml = false,
        confirm = function () {

        }
    } = {}) {
    Dialog.alert({
        title,
        message,
        theme,
        confirmButtonText,
        confirmButtonColor,
        overlay,
        closeOnClickOverlay,
        lockScroll,
        allowHtml
    }).then(() => {
        confirm();
    });
}

/**
 * 确认弹窗
 *
 * @param title
 * @param message
 * @param theme
 * @param confirmButtonText
 * @param confirmButtonColor
 * @param cancelButtonText
 * @param cancelButtonColor
 * @param overlay
 * @param closeOnClickOverlay
 * @param lockScroll
 * @param allowHtml
 * @param confirm
 * @param cancel
 */
function confirm(
    {
        title = '提示',
        message = '',
        theme = 'round',
        confirmButtonText = '确认',
        confirmButtonColor = '#ee0a24',
        cancelButtonText = '取消',
        cancelButtonColor = 'black',
        overlay = true,
        closeOnClickOverlay = false,
        lockScroll = true,
        allowHtml = false,
        confirm = function () {

        },
        cancel = function () {

        }
    } = {}) {
    Dialog.confirm({
        title,
        message,
        theme,
        showCancelButton: true,
        confirmButtonText,
        confirmButtonColor,
        cancelButtonText,
        cancelButtonColor,
        overlay,
        closeOnClickOverlay,
        lockScroll,
        allowHtml
    }).then(() => {
        confirm();
    }).catch(() => {
        cancel();
    });
}

//对外抛出方法
export default {
    errorMsg,
    successMsg,
    alert,
    confirm,
}