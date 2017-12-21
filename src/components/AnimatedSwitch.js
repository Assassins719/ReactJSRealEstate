import React from 'react';
import { Switch } from 'react-router-dom';
import * as Animated from 'animated/lib/targets/react-dom';

/*
  This is just extending Switch rather than Component
  Were making a component to wrap our route component.
  It will receive the lifecycle methods from TransitionGroup,
  which we can use for animation.

  We also use Animated to create a value we can use
  to animate different style properties of the div
  that wraps our child component.
*/

export default class AnimatedSwitch extends Switch {
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0)
    };
  }
  componentWillAppear(cb) {
    setTimeout(
      () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
      250
    );
    cb();
  }
  componentWillEnter(cb) {
    setTimeout(
      () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
      250
    );
    cb();
  }
  componentWillLeave(cb) {
    Animated.spring(this.state.animate, { toValue: 0 }).start();
    setTimeout(() => cb(), 175);
  }
  render() {
    const style = {
      opacity: Animated.template`${this.state.animate}`,
      transform: Animated.template`
        translate3d(0,${this.state.animate.interpolate({
          inputRange: [0, 1],
          outputRange: ['12px', '0px']
        })},0)
      `
    };
    return (
      <Animated.div style={style}>
        {super.render()}
      </Animated.div>
    );
  }
}
