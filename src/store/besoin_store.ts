
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import jwt_decode from "jwt-decode";
import { BesoinDetails, Step } from '../types/types';






type BesoinState<T> = {
  
  active_besoin?: BesoinDetails
  active_step: number
  comment: string
  files: (File | any)[]
  choices: string[]

  

  set_besoin: (step: BesoinDetails) => void 
  set_choices: (choices: string[]) => void 
  set_active_step: (step_id: number) => void 

  get_step: ()=>(Step|undefined)
  

}



const vanillaBesoinStore = create<BesoinState<unknown>>()(
  devtools(
    persist(
      (set, get) => ({
        choices: [],
        comment: "",
        files: [],
        active_step: -1,
        set_besoin: (active_besoin) => set(old_value=>  ({active_besoin})),
        set_choices: (choices) => set(old_value=>  ({choices})),
        set_active_step: (active_step) => set(old_value =>   ({active_step})),
        get_step: ()=> get().active_besoin?.steps.find(item => item.id == get().active_step)
      }),
      {
        name: 'besoin_store',
      }
    )
  )
)

const useBesoinState = vanillaBesoinStore as {
    <T>(): BesoinState<T>;
    <T, U>(selector: (s: BesoinState<T>) => U): U;
}
//const useBesoinState = (selector: { (state: BesoinState): Partial<BesoinState> }) => useStore(vanillaBesoinStore, selector)

export {
    useBesoinState,
    vanillaBesoinStore
}

