import { Context, createContext, Dispatch, useContext } from 'react';

interface ICanvasCtx {
  selected?: string;
  setSelected?: Dispatch<(prevState: undefined) => undefined>;
}

export const CanvasCtx: Context<ICanvasCtx> = createContext({});

export const useCanvas = () => useContext(CanvasCtx);
