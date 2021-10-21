
export default function Form ({value, onSubmit}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target[0].value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='number' min="5" max="20" step="1"
                defaultValue = {value}
                onChange={() => {}}
            />
            <button>Change board's size</button>
        </form>
    );
}