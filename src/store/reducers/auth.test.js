import reducer from './auth';
import * as actionsTypes from '../actions/actionTypes';

describe('Test Auth Reducer', () => {
    it('Test auth reducer with no action', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            idToken: null,
            localId: null,
            error: null,
            redirectPath: '/'
        })
    })
    it('Test auth reducer with few actions', () => {
        expect(reducer({
            loading: false,
            idToken: null,
            localId: null,
            error: null,
            redirectPath: '/'
        }, {
            type: actionsTypes.AUTH_SUCCESS,
            idToken: 'test-token',
            localId: 'test-id'
       
        })).toEqual({
            loading: false,
            idToken: 'test-token',
            localId: 'test-id',
            error: null,
            redirectPath: '/'
        })
    })
})