export const random = (num) => Math.ceil(Math.random() * num);

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

export function getTime(){
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`
    return time;
}