import React, {useState, useEffect} from 'react'

let Image = (props) => {
    const [ref] = useState(React.createRef())
    useEffect(() => {

        const selectedImage = ref.current
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0
        }
        function imageRender(image) {
            image.classList.add('appear')
        }
        const observer = new IntersectionObserver(function (entries, observer) {
            let entry = entries[0]
            if(!entry.isIntersecting){
                return
            } else {
                imageRender(entry.target)
                observer.unobserve(entry.target)
            }
            // console.log(entry.isIntersecting, props)
        }, options)
        observer.observe(selectedImage)
    }, [ref])

    return (
        <div>
            <div class = 'ui segment'>
                <div ref ={ref} class = 'image transition'>
                    {props.children}
                </div>
            </div>
        </div>
    )
} 

export default Image