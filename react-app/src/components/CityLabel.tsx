import "../styles/CityLabel.css"

const CityLabel = (props: any) => {
    return (
        <div id="cityLabel">
            <p>{props.city}</p>
        </div>
    )
}

export default CityLabel