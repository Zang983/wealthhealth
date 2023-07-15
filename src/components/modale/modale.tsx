import { useEffect, useRef, createElement } from "react"

type ConfigObj = {
    classNameDialog?: undefined | string | null,
    idDialog?: undefined | string | null,
    classNamePrimaryBtn?: undefined | string | null,
    idPrimaryBtn?: undefined | string | null,
    classNameSecondaryBtn?: undefined | string | null,
    idSecondaryBtn?: undefined | string | null,
    classNameTitle?: undefined | string | null,
    idTitle?: undefined | string | null,
    classNameContent?: undefined | string | null,
    idContent?: undefined | string | null,
    elementDialog?: "p",
    elementTitle?: "h3",
    textDialog?: string,
    textTitle?: string,
    primaryBtnText?: undefined | string | null,
    secondaryBtnText?: undefined | string | null,
    secondaryBtn?: boolean,
    title?: boolean,
    primaryBtn?: boolean,
    contentDialog?: boolean,
    closeByBackground?: boolean,
}
type Props = {
    customConfig: ConfigObj,
    refDialog: React.RefObject<HTMLDialogElement>
}

function CustomDialog({ customConfig, refDialog }: Props) {
    const forCloseBack = useRef(null)
    let Config = {
        classNameDialog: undefined,
        idDialog: undefined,
        classNamePrimaryBtn: undefined,
        idPrimaryBtn: undefined,
        classNameSecondaryBtn: undefined,
        idSecondaryBtn: undefined,
        classNameTitle: undefined,
        idTitle: undefined,
        classNameContent: undefined,
        idContent: undefined,
        elementDialog: "p",
        elementTitle: "h3",
        textDialog: "Default Text",
        textTitle: "Default Title",
        primaryBtnText: undefined,
        secondaryBtnText: undefined,
        secondaryBtn: true,
        title: true,
        primaryBtn: true,
        contentDialog: true,
        closeByBackground: true,
    }

    if (customConfig)
        Config = Object.assign(Config, customConfig)

    const closeModale = () => {
        if (refDialog.current)
            refDialog.current.close()
    }
    useEffect(() => {
        refDialog.current && refDialog.current.addEventListener("click", (e) => {
            if (refDialog.current && Config.closeByBackground) {
                const dialogDim = refDialog.current.getBoundingClientRect()
                if (
                    e.clientX < dialogDim.left ||
                    e.clientX > dialogDim.right ||
                    e.clientY < dialogDim.top ||
                    e.clientY > dialogDim.bottom
                )
                    closeModale()
            }
        })
    })

    return (
        <dialog ref={refDialog} className={Config.classNameDialog} id={Config.idDialog}>
            <div ref={forCloseBack}>
                {Config.secondaryBtn &&
                    <button aria-label="Close dialog" className={Config.classNameSecondaryBtn} id={Config.idSecondaryBtn} onClick={() => closeModale()}>
                        {Config.secondaryBtnText}
                    </button>}
                {Config.title &&
                    createElement(Config.elementTitle, { className: Config.classNameTitle, id: Config.idTitle }, Config.textTitle)
                }
                {Config.contentDialog &&
                    createElement(Config.elementDialog, { className: Config.classNameContent, id: Config.idContent }, Config.textDialog)
                }
                {Config.primaryBtn &&
                    <button aria-label="Close dialog" className={Config.classNamePrimaryBtn} id={Config.idPrimaryBtn} onClick={() => closeModale()}>
                        {Config.primaryBtnText}
                    </button>}
            </div>
        </dialog>
    )
}

export default CustomDialog   