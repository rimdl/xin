import { unref } from 'vue';
import themes from 'juejin-markdown-themes';
import highlight_css from "public/highlight_css.json"

const highlightThemes = highlight_css.highlight_css
let $tree:Node;
let $frontmatter;

const changeTheme = (themeName:string) => {
    removeTheme();
    const $style = document.createElement('style');
    $style.id = `md_document_${themeName}`
    $style.innerHTML = themes[themeName]?.style ?? themes['juejin'].style;
    document.head.appendChild($style);
    return () => {
        $style.remove();
    };
};

const removeTheme = () => {
    const $rm = document.getElementsByTagName('style')
    for (let i = 0; i < $rm.length; i++) {
        if ($rm[i].id.includes('md_document')) {
            document.head.removeChild($rm[i]);
        }
    }
};

const changeHighlightTheme = (themeName:string) => {
    removeHighlightTheme();
    const $style = document.createElement('style');
    $style.id = `md_highlightjs_${themeName}`
    // @ts-ignore
    $style.innerHTML = highlightThemes[themeName].style ?? highlightThemes['github'].style;
    document.head.appendChild($style);
    return () => {
        $style.remove();
    };
};
const removeHighlightTheme = () => {
    const $rm = document.getElementsByTagName('style')
    for (let i = 0; i < $rm.length; i++) {
        if ($rm[i].id.includes('md_highlightjs')) {
            document.head.removeChild($rm[i]);
        }
    }
};

function getScrollContainer(el, className) {
    const parentNode = el.parentNode;
    if (!parentNode || parentNode === document.documentElement) return parentNode;
    if (className ? parentNode.classList.contains('md-scroll-container') : window.getComputedStyle(parentNode).overflow === 'auto' || window.getComputedStyle(parentNode).overflow === 'overlay') {
        return parentNode;
    }
    return getScrollContainer(parentNode);
}

export default (options = { theme: 'github', highlight: 'github' }) => {
    return {
        // @ts-ignore
        viewerEffect({ file }) {
            const themeName = unref(file)?.frontmatter?.theme || options.theme || 'github';
            const highlightName = unref(file)?.frontmatter?.highlight || options.highlight || 'github';
            changeTheme(themeName);
            changeHighlightTheme(highlightName);
            const markdown = document.querySelector('.markdown-body');
            const headings = markdown && markdown.querySelectorAll('h1,h2,h3,h4,h5,h6') || [];
            const scrollContainer = getScrollContainer(markdown);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.id.split('-')[1]);
                    const isAbove = entry.boundingClientRect.top < entry.rootBounds.top;
                    if (entry.isIntersecting) {
                        if (!isAbove) { // 如果从上往里进入
                            options.topic.currentTopicIndex = index - 1;
                        }
                    } else {
                        if (isAbove) { // 如果从里往上出去
                            options.topic.currentTopicIndex = index;
                        }
                    }
                });
            }, {
                threshold: 1,
                root: scrollContainer,
                rootMargin: `-120px 0px 0px 0px`
            });
            Array.from(headings).forEach((heading, index) => {
                heading.id = `heading-${index}`;
            });
            const pres = markdown && markdown.querySelectorAll('pre') || [];
            pres.forEach(function (pre:HTMLPreElement){
                pre.classList.add('relative','group','w-full');
                let el = document.createElement('div');
                el.innerHTML = `<button class="btn bg-base-100 opacity-0 group-hover:opacity-50 hover:opacity-100 btn-sm transition duration-300 copyBtn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
           </button>`;

                el.classList.add('absolute', 'top-1','right-1','tooltip','tooltip-left');
                el.setAttribute('data-tip', '复制代码');
                pre.appendChild(el)
            })
        },
        actions: [
            {
                title: '选择主题',
                // icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024"><path fill="currentColor" d="M870 126H663.8c-17.4 0-32.9 11.9-37 29.3C614.3 208.1 567 246 512 246s-102.3-37.9-114.8-90.7a37.93 37.93 0 0 0-37-29.3H154a44 44 0 0 0-44 44v252a44 44 0 0 0 44 44h75v388a44 44 0 0 0 44 44h478a44 44 0 0 0 44-44V466h75a44 44 0 0 0 44-44V170a44 44 0 0 0-44-44m-28 268H723v432H301V394H182V198h153.3c28.2 71.2 97.5 120 176.7 120s148.5-48.8 176.7-120H842z"/></svg>',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 32 32"><g fill="none"><path fill="#AC5810" d="M19.343 4.83C11.708.802 4.757 3.672 2.253 7.595C1.432 8.877.852 11.21.874 13.06c.045 3.807 2.152 8.05 6.7 12.33c5.595 5.265 11.305 4.805 13.12 4.363c2.285-.558 3.817-1.033 3.582-3.163c-.03-.28-.27-.788-.632-1.01c-1.162-.705-3.59-1.072-4.732-2.77c-1.66-2.472.404-2.597 2.382-1.54c2.117 1.133 3.327 1.84 5.452 1.645c1.558-.142 3.823-1.082 4.13-3.71c.276-2.377-3.194-9.975-11.534-14.375m3.117 12.92c-.585.89-2.03.585-2.977-.255c-.948-.84-1.07-2.24-.456-2.79c.625-.557 1.8-.43 2.748.41c.945.842 1.143 1.935.685 2.635"/><path fill="#F2A259" d="M19.678 3.923C12.042-.105 5.074 3.01 2.57 6.933c-2.507 3.925-1.417 11.192 5.338 17.55c5.594 5.264 11.305 4.805 13.12 4.362c2.285-.557 3.897-1.645 2.892-3.032c-.693-.958-3.175-1.68-4.673-3.91c-1.66-2.473.406-2.598 2.383-1.54c2.117 1.132 3.328 1.84 5.453 1.645c1.557-.143 3.912-1.348 3.842-3.783c-.073-2.393-2.908-9.9-11.248-14.302m3.514 13.757c-.712.77-2.23.56-3.39-.465c-1.157-1.027-1.52-2.482-.807-3.25c.712-.77 2.23-.56 3.39.465c1.16 1.025 1.52 2.483.807 3.25"/><path fill="#EEE" d="M11.905 21.165c.288-.735 2.333-1.54 4.213-.203c.527.375 1.187 1.33 1.12 2.53c-.22 3.92-6.653 1.055-5.333-2.327"/><path fill="#2686C6" d="M5.933 14.518c.657-1.05 2.255-1.17 3.652-.263c1.245.807 2.285 2.795.75 4.095c-.822.697-2.245.265-3.122-.408c-1.065-.812-1.988-2.294-1.28-3.424"/><path fill="#FFEE58" d="M14.418 5.355c.202-.832 1.614-.975 2.614-.602c1.728.645 2.51 2.355 1.873 3.307c-.933 1.393-2.965.915-3.735.118c-1.307-1.35-.922-2.125-.752-2.823"/><path fill="#7CB342" d="M24.428 9.43c1.384.63 1.564 1.627 1.3 2.355c-.166.45-.503 1.067-1.193 1.123c-1.168.095-1.33-.87-2.163-1.135c-.7-.223-.985-1.18-.71-1.823c.256-.592 1-1.325 2.765-.52"/><path fill="#B0B0B0" d="M16.743 24.24c-.345.313-1.543.698-3.063-.252c-.515-.323-1.008-.79-1.285-1.49c-.217-.55-.17-1.08-.072-1.315c.28-.678.707-.803.707-.803c-.43-.03-1.242.54-1.377 1.288c-.043.235-.346 1.704 1.602 3.037c1.677 1.15 4.158 1.043 3.995-1.272a1.82 1.82 0 0 1-.508.807"/><path fill="#01579B" d="M11.065 16.43c-.047.893-1.093 1.363-1.675 1.365c-1.648.002-3.128-1.033-3.23-2.875c-.018-.33.145-.807.145-.807c-.218.092-.525.562-.59.827c-.385 1.59 1.217 3.443 2.905 3.818c.855.19 1.933-.103 2.325-.868c.28-.545.225-1.012.12-1.46"/><path fill="#DF7F14" d="M16.83 8.18c-1.12-.128-1.74-.86-1.902-1.028c-.446-.465-.72-.917-.56-1.587c.05-.215.172-.49.322-.645c-.182.06-.477.452-.57.665c-.095.212-.44 1.01.3 1.992c.457.61 1.255 1.298 2.435 1.463c.837.117 1.438-.183 1.938-.67c.34-.333.49-1.083.287-1.47c.033.282-.485 1.482-2.25 1.28"/><path fill="#558B2F" d="M26.043 11.213a2.349 2.349 0 0 0-.425-.79c.127.245.38.98-.15 1.694c-.268.36-1.073.803-2.023.033c-.28-.228-.505-.453-1.01-.638c-1.282-.472-.723-1.777-.277-2.182c-.35.183-.668.51-.8 1.01c-.186.697.272 1.428.967 1.777c.79.398 1.045 1.165 2.128 1.165c.055 0 .112-.002.175-.007c.73-.062 1.037-.345 1.26-.69c.272-.43.28-.918.154-1.373"/><path fill="#F44336" d="M6.455 6.448c.57-.563 1.562-1.158 3.015-.4c.875.455 1.893.99 1.432 2.84c-.284 1.147-1.955 1.755-3.35.477C7 8.86 4.9 7.982 6.455 6.447"/><path fill="#C62828" d="M11.235 8.64c.018-.437-.207-.97-.285-1.15c.013.262.24.925-.802 1.802a1.725 1.725 0 0 1-1.738.255c-.367-.145-.895-.752-1.272-.905c-1.403-.564-.798-2.067-.6-2.272a1.689 1.689 0 0 0-.688 1.095c-.13.678-.01 1.318.92 2.05c2.64 2.082 3.45.827 3.738.508c.362-.39.707-.9.727-1.383"/><path fill="#fff" d="M16.435 4.84c-.367-.172-1.417-.122-1.62.753c-.122.525.263 1.057.625.995c.412-.07.193-.713.44-.895c.377-.275 1.07-.61.555-.853M8.69 6.115c-.362-.24-1.52-.242-1.867.645c-.21.533.117 1.15.51 1.14c.447-.01.232-.537.604-.872c.47-.423 1.26-.578.753-.913m-.172 8.01c-.343-.217-1.358-.303-1.778.492c-.308.585.115 1.23.482 1.213c.418-.02.278-.685.545-.835c.408-.227 1.23-.565.75-.87m5.832 6.657c-.367-.172-1.418-.122-1.62.753c-.123.525.262 1.058.625.995c.412-.07.192-.713.44-.895c.375-.275 1.068-.61.555-.853m9.42-11.27c-.33-.234-1.372-.372-1.727.453c-.213.495.07 1.088.437 1.09c.418.002.315-.668.593-.803c.417-.202 1.16-.41.697-.74"/></g></svg>',
                handler: {
                    type: 'dropdown',
                    actions: Object.keys(themes).map((themeName) => {
                        return {
                            title: themeName,
                            handler: {
                                type: 'action',
                                // @ts-ignore
                                click({ editor, appendBlock, codemirror }) {
                                    // @ts-ignore
                                    if (!!$tree.children.length && $tree.children[0].type === 'yaml') {
                                        // @ts-ignore
                                        $frontmatter = $tree.children[0];
                                    } else {
                                        $frontmatter = undefined;
                                    }
                                    if ($frontmatter) {
                                        const machted = $frontmatter.value.match(/theme:\s*(\S*)/i);
                                        if (machted) {
                                            editor.setValue(editor.getValue().replace($frontmatter.value, $frontmatter.value.replace(/theme:\s*(\S*)/i, `theme: ${themeName}`)));
                                        } else {
                                            editor.setValue(editor.getValue().replace($frontmatter.value, $frontmatter.value + `\ntheme: ${themeName}`));
                                        }
                                    } else {
                                        editor.setValue(`---\ntheme: ${themeName}\n---` + editor.getValue());
                                    }
                                }
                            }
                        };
                    })
                }
            },
            {
                title: '选择代码高亮样式',
                // icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="m9.6 15.6l1.4-1.425L8.825 12L11 9.825L9.6 8.4L6 12zm4.8 0L18 12l-3.6-3.6L13 9.825L15.175 12L13 14.175zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/></svg>',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 32 32"><g fill="none"><path fill="#FBB8AB" d="M21.993 5.854c-6.707-3.42-14.656-2.1-18.279 3.883C.091 15.72 2.398 23.68 8.87 27.517c3.18 1.886 8.312 3.811 10.398 1.244c2.044-2.516-.972-4.11-.268-5.502c1.133-2.24 6.2.699 9.515-2.922c3.734-4.082.009-11.151-6.522-14.483M24 19c-1.745 0-3-1.273-3-3s1.255-3 3-3s3 1.273 3 3s-1.255 3-3 3"/><path fill="#8D65C5" d="M14.25 11a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5"/><path fill="#F70A8D" d="M8.25 15a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5"/><path fill="#00D26A" d="M8.25 22a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5"/><path fill="#3F5FFF" d="M13.75 26.5a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5"/></g></svg>',
                handler: {
                    type: 'dropdown',
                    actions: Object.keys(highlightThemes).map((themeName) => {
                        return {
                            title: themeName,
                            handler: {
                                type: 'action',
                                // @ts-ignore
                                click({ editor, appendBlock, codemirror }) {
                                    // @ts-ignore
                                    if (!!$tree.children.length && $tree.children[0].type === 'yaml') {
                                        // @ts-ignore
                                        $frontmatter = $tree.children[0];
                                    } else {
                                        $frontmatter = undefined;
                                    }
                                    if ($frontmatter) {
                                        const machted = $frontmatter.value.match(/highlight:\s*(\S*)/i);
                                        if (machted) {
                                            editor.setValue(editor.getValue().replace($frontmatter.value, $frontmatter.value.replace(/highlight:\s*(\S*)/i, `highlight: ${themeName}`)));
                                        } else {
                                            editor.setValue(editor.getValue().replace($frontmatter.value, $frontmatter.value + `\nhighlight: ${themeName}`));
                                        }
                                    } else {
                                        editor.setValue(`---\nhighlight: ${themeName}\n---` + editor.getValue());
                                    }
                                }
                            }
                        };
                    })
                }
            }
        ],
        // @ts-ignore
        remark(processor) {
            return processor.use(() => (tree:Node) => {
                $tree = tree;
            });
        }
    }
};
