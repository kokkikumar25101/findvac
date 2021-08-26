import React from 'react';

// Root Include
// const Root = React.lazy(() => import('./pages/FindVacHome/indexRoot'));

// //Main Index
// const Main = React.lazy(() => import('./pages/FindVacHome/indexMain'));

// //Special
const PageComingSoon = React.lazy(() => import('./pages/Pages/Special/PageComingSoon'));
const PageComingSoon2 = React.lazy(() => import('./pages/Pages/Special/PageComingSoon2'));
const PageError = React.lazy(() => import('./pages/Pages/Special/PageError'));
const PageMaintenance = React.lazy(() => import('./pages/Pages/Special/PageMaintenance'));

//Auth Pages
const AuthPage = React.lazy(() => import('./pages/Pages/AuthPages/AuthPage'));
const AuthEntryForm = React.lazy(() => import('./pages/Pages/AuthPages/AuthEntryForm'));
const PageLogin = React.lazy(() => import('./pages/Pages/AuthPages/PageLogin'));
const PageCoverLogin = React.lazy(() => import('./pages/Pages/AuthPages/PageCoverLogin'));
const PageLoginThree = React.lazy(() => import('./pages/Pages/AuthPages/PageLoginThree'));

const PageSignup = React.lazy(() => import('./pages/Pages/AuthPages/PageSignup'));
const PageCoverSignup = React.lazy(() => import('./pages/Pages/AuthPages/PageCoverSignup'));
const PageSignupThree = React.lazy(() => import('./pages/Pages/AuthPages/PageSignupThree'));

const PageCoverRePassword = React.lazy(() => import('./pages/Pages/AuthPages/PageCoverRePassword'));
const PageRecoveryPassword = React.lazy(() => import('./pages/Pages/AuthPages/PageRecoveryPassword'));
const PageRePasswordThree = React.lazy(() => import('./pages/Pages/AuthPages/PageRePasswordThree'));

const FindVacHome = React.lazy(() => import('./pages/FindVacHome/index'));
// const LocateCenter = React.lazy(() => import('./pages/CenterDetails/index'));
const CenterDetails = React.lazy(() => import('./pages/CenterDetails/index'));

const Contact = React.lazy(() => import('./pages/Contact/index'));
// //Contact
// const PageContactDetail = React.lazy(() => import('./pages/Pages/Contact/PageContactDetail'));
// const PageContactOne = React.lazy(() => import('./pages/Pages/Contact/PageContactOne'));
// const PageContactThree = React.lazy(() => import('./pages/Pages/Contact/PageContactThree'));
// const PageContactTwo = React.lazy(() => import('./pages/Pages/Contact/PageContactTwo'));


const routes = [
    //routes without Layout

    //Contct without layout
    // { path: '/page-contact-detail', component: PageContactDetail, isWithoutLayout : true },

    // //Special Pages
    { path: '/page-comingsoon', component: PageComingSoon, isWithoutLayout : true },
    { path: '/page-comingsoon2', component: PageComingSoon2, isWithoutLayout : true },
    { path: '/page-error', component: PageError, isWithoutLayout : true },
    { path: '/page-maintenance', component: PageMaintenance, isWithoutLayout : true },

    { path: '/auth', component: AuthEntryForm, isWithoutLayout : true },
    { path: '/auth-login', component: PageLogin, isWithoutLayout : true },
    { path: '/auth-signup', component: PageSignup, isWithoutLayout : true },
    // { path: '/locateCenter', component: LocateCenter , isWithoutFooter: true , exact : true},
    // { path: '/locateCenter/:centerId', component: LocateCenter , isWithoutFooter: true , exact : true},
    
    { path: '/viewCenters/:displayType/', component: CenterDetails , isWithoutFooter: true , exact : true},
    { path: '/viewCenters/:displayType/:centerId', component: CenterDetails , isWithoutFooter: true , exact : true},
    { path: '/viewCenters', component: CenterDetails , exact : true},
    { path: '/contact', component: Contact, exact : true},
    //Index Main
    { path: '/index', component: FindVacHome },

    //Index root
    
    { path: '/', component: FindVacHome, exact : true }, 
    { component: PageError, isWithoutLayout : true, exact : false },
    
];

export default routes;