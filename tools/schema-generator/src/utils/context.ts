import { Context, createContext, Dispatch, useContext } from 'react';

interface ICanvasCtx {
  selected?: string;
  setSelected?: Dispatch<(prevState: undefined) => undefined>;
  sortableSchema?: any;
  setSortableSchema?: (sortableSchema: any) => any;
}

export const CanvasCtx: Context<ICanvasCtx> = createContext({});

export const useCanvas = () => useContext(CanvasCtx);
