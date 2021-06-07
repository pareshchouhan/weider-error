import { Statement } from '@angular/compiler';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  createAction,
  MetaReducer
} from '@ngrx/store';
import { produceOn, undoRedo } from 'ngrx-wieder';
import { environment } from '../../environments/environment';
import { UndoRedoState, initialUndoRedoState } from "ngrx-wieder";

export interface State {
}
export const updateTemp = createAction('Update Temp');
export interface TempState extends UndoRedoState {
  todos: any;
}


export const initialState: TempState = {
  todos: [],
  ...initialUndoRedoState,
};
export const reducer2: ActionReducerMap<State, any> = {};

// initialize ngrx-wieder with custom config
const { createUndoRedoReducer } = undoRedo({
  allowedActionTypes: [updateTemp.name],
});

export const reducers = createUndoRedoReducer(
  initialState,
  produceOn(updateTemp, (state) => {
    state.todos[0] = 1;
  })
);


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
