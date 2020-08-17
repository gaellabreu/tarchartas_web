export default class Event {
    constructor(obj = null) {
        Object.assign(this, obj)
    }

    id = ''
    name = ''
    venue = ''
    date = new Date()
    start_time = 0
    end_time = 0
    description = ''
    category = ''
    image_content = ''
}