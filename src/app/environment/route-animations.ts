import {
    trigger, transition, style, query, animate
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
            animate('200ms ease-in', style({ opacity: 0 }))
        ], { optional: true }),
    ]),
]);

