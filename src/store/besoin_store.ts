
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import jwt_decode from "jwt-decode";



interface Step {
    id: number
    title: string
    code_family: string
    icon: string
    image: string
    user_help: string
    comment: string;
    description: string
    need: number
    criteria: string
    criteria_list: string[]
}

interface Besoin {
    id: number
    designation: string
    state: string
    create_at: string
    update_at: string
    description: string
    supervisor: string | null
    executor: string | null
    company: string | null
    client: string | null
    task: string | null
    owner: string | null
    operator: string | null
    zip: string | null
}





type BesoinState<T> = {
  
  active_besoin: Besoin
  step_list: Step[]
  active_step: number
  

  set_besoin: (step: Besoin) => void 
  set_active_step: (step_id: number) => void 
  

}



const vanillaBesoinState = create<BesoinState<unknown>>()(
  devtools(
    persist(
      (set, get) => ({
        active_besoin: {} as Besoin,
        step_list: [] as Step[],
        active_step: -1,
        set_besoin: (active_besoin) => set(old_value=>  ({active_besoin})),
        set_active_step: (active_step) => set(old_value =>   ({active_step}))
      }),
      {
        name: 'besoin_store',
      }
    )
  )
)

const useBesoinState = vanillaBesoinState as {
    <T>(): BesoinState<T>;
    <T, U>(selector: (s: BesoinState<T>) => U): U;
}
//const useBesoinState = (selector: { (state: BesoinState): Partial<BesoinState> }) => useStore(vanillaBesoinState, selector)

export {
    useBesoinState,
    vanillaBesoinState
}

