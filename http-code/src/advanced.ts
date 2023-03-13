
import {isHttpCode} from './utils'

function searchHook(str){
    if( isHttpCode(str) ){
        return 5
    }
}

function renderOnSearchHook(str){
    if( isHttpCode(str) ){
        return true
    }else{
        return false
    }
}

export default {
    searchHook,
    renderOnSearchHook
}