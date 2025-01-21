interface StartModalProps {
    modalOpen: boolean,
    onStart: () => void,
    onClose: () => void;
}

function StartModal ({modalOpen, onStart, onClose }: StartModalProps){

    if (!modalOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
             <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-center p-8">
            <div className="text-xl border float-right py-1 px-3 rounded-lg shadow" onClick={onClose}>x</div>
            <h1 className="p-5">Welcome to <span className="uppercase">Keyboard Warrior</span></h1>
            <p>For <span className="uppercase">maximum points</span> press the letters when they are perfectly over the target! </p>
            <button className="bg-stone-100 px-6 py-1 mt-10 rounded-lg shadow" onClick={onStart}>Start</button>
            </div>
        </div>
    )

}

export default StartModal