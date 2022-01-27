import { Context, createContext, Dispatch, useContext } from 'react';

interface ICanvasCtx {
  getId?: (name: string) => string;
  selected?: string;
  setSelected?: any;
  schema?: any;
  setSchema?: (schema: any) => any;
}

export const CanvasCtx: Context<ICanvasCtx> = createContext({});

export const useCanvas = () => useContext(CanvasCtx);
