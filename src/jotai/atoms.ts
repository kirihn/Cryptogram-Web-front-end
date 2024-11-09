import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const darkModeAtom = atomWithStorage('darkMode', true);
const ruModeAtom = atomWithStorage('LangMode', 'ru');

// import { useAtom } from 'jotai'
// import { atomWithStorage } from 'jotai/utils'

// // Set the string key and the initial value
// const darkModeAtom = atomWithStorage('darkMode', false)

// const Page = () => {
//   // Consume persisted state like any other atom
//   const [darkMode, setDarkMode] = useAtom(darkModeAtom)
//   const toggleDarkMode = () => setDarkMode(!darkMode)
//   return (
//     <>
//       <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
//       <button onClick={toggleDarkMode}>toggle theme</button>
//     </>
//   )
// }

import { atom } from 'jotai';

export const themeAtom = atom('dark');

// import { useAtom } from 'jotai';
// import { useSetAtom } from 'jotai';
// import { useAtomValue } from 'jotai';

// const [count, setCount] = useAtom(coutAtom);

// const textAtom = atom('hello')
// const uppercaseAtom = atom(
//   (get) => get(textAtom).toUpperCase()
// )
// const Uppercase = () => {
//     const [uppercase] = useAtom(uppercaseAtom)
//     return (
//       <div>Uppercase: {uppercase}</div>
//     )
//   }
