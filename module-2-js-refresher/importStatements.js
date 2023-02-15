import pkg from './randompackage'; //pkg is we using constant to use the package
import { componentPkg as cp } from './randompackage'; //anything written in { } is not something we name it, those are th components inside that particular package, here 'cp' is alias of component
import * as allPkgs from './randompackage';//fetches all componeents in a package
import { base } from './exportStatement';