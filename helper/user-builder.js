console.log(__dirname);
console.log(__filename)

const createUser = (name, age) => {
    return {
        name,
        age,
        greeting: () => {
            console.log(`Hello, my name ${name}`)
        }
    }
}

module.exports = {
    createUser
}