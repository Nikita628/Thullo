import React, { useState, useEffect } from 'react';

interface TransitionProps {
    isIn: boolean;
    timeoutMs: number;
    children: (animationState: AnimationState) => React.ReactNode;
}

export enum AnimationState {
    "entering" = "entering",
    "entered" = "entered",
    "exiting" = "exiting",
    "exited" = "exited"
}

/** 
 * Allows to unmount child components from the DOM, after they were animated.
 ** isIn - indicates whether child component should be displayed or not
 ** timeoutMs - timeout in milliseconds, which elapses between entering->entered and exiting->exited state changes
 ** children - function that accepts one of the states and returns child component wich should be rendered. You can control
 animation cycle by observing current state and assigning styles to child component depending on the state.
 ** Child function will accept one of the following states:
 ** entering - on the start of the animation, child component just mounted into the DOM
 ** entered - after animation ended and child component is being displayed
 ** exiting - on the start of the animation, before child component is unmounted from the DOM
 ** exited - after animation has finished and child component was unmounted from the DOM
 */
const Transition = (props: TransitionProps) => {
    const [animationState, setAnimationState] = useState<AnimationState>(props.isIn ? AnimationState.entered : AnimationState.exited);

    useEffect(() => {
        const shouldStartAnimation =
            props.isIn && animationState === AnimationState.exited
            || !props.isIn && animationState === AnimationState.entered
            || animationState === AnimationState.entering
            || animationState === AnimationState.exiting;

        if (shouldStartAnimation) {
            if (animationState === AnimationState.entered) {
                setTimeout(() => setAnimationState(AnimationState.exiting), 100);
            } else if (animationState === AnimationState.exited) {
                setTimeout(() => setAnimationState(AnimationState.entering), 100);
            } else if (animationState === AnimationState.entering) {
                setTimeout(() => setAnimationState(AnimationState.entered), props.timeoutMs);
            } else if (animationState === AnimationState.exiting) {
                setTimeout(() => {
                    setAnimationState(AnimationState.exited);
                    props.children(AnimationState.exited);
                }, props.timeoutMs);
            }
        }

    }, [animationState, props.isIn]);

    return (
        <>{
            !props.isIn && animationState === AnimationState.exited
                ? null
                : props.children(animationState)
        }</>
    );
}

export default Transition;