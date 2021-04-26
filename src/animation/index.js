import easeFn from "./ease"

export const animate = ({draw, duration = 1000, ease = "linear"}) => {
    let start = performance.now()
    const timing = easeFn[ease] ?? easeFn

    requestAnimationFrame( function animate (time){
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing.apply(null, [timeFraction]);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    } )
}