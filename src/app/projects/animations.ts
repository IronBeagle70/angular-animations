import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const markedTrigger = trigger('markedState',[
  state('default',style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '20px'
  })),
  state('marked',style({
    border: '2px solid blue',
    backgroundColor: '#caeff9',
    padding: '19px'
  })),
  transition('default => marked', [ //steps
    style({
      border: '2px solid black',
      padding: '19px'
    }),
    //transicion de escala
    animate('200ms ease-out', style({ //transicion temporal
      transform: 'scale(1.05)'
    })),
    //tiempo de la transicion
    animate(200)
  ]),
  transition('marked => default', [ //steps
    style({
      border: '1px solid blue',
      padding: '20px'
    }),
    animate('300ms ease-out')
  ]),
  // transition('default <=> marked', animate('300ms ease-out')),
  // transition('default => marked', animate('300ms ease-out'))
]);

export const itemStateTrigger = trigger ('itemState', [

  transition(':leave', [
    // style({
    //   opacity: 0,
    //   transform: 'translateX(-100%)'
    // }),
    animate('500ms ease-in', keyframes([
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
      style({
        transform: 'translateX(-15%)',
      }),
      style({
        opacity: 0,
        transform: 'translateX(100%)',
      })
    ]))
  ]),
  transition('slidUp => slidDown', [
    style({
      transform: 'translatey(-100%)',
    }),
    animate('300ms ease-out', style({
      transform: 'translatey(0)',
    }))
  ]),
  transition('slidDown => slidUp', [
    style({
      transform: 'translatey(0)',
    }),
    animate('300ms ease-out', style({
      transform: 'translatey(-100%)',
    }))
  ]),
])

export const slideStateTrigger = trigger('slideState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(-100%)'
    }))
  ])
])

export const listStateTrigger = trigger('listState',[
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
      stagger(300, [
        animate('500ms ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(15%)',
            offset: 0.4
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1
          })
        ]))
      ]),
    ], {optional: true})
  ])
]);
