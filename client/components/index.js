/**
 * `components/index.js` exists simply as a 'central export' for our react components.
 * This way, we can import all of our react components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllMugs} from './AllMugs'
export {default as SingleMug} from './SingleMug'
