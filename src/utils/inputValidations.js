
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}

export const advertisementTitleValidation = value => {
    let errors = []
    if (!value) {
        errors.push("Ametikoha nimetus on sisestamata!")
    }
    if (value && value.length > 30) {
        errors.push("Ametikoha nimetus on võib olla maksimaalselt 20 tähemärkki")
    }
    return errors
}

export const advertisementCategoryValidation = values => {
    return values.length < 1 ? ["Kategooria(d) on valimata!"] : []
}

export const advertisementCheckboxCheckedValidation = value => {
    return !value ? ["Palun tutvuge kasutustingimustega!"] : []
}

export const imageValidation = value => {
    if (!value) return []
    let errors = []
    const fileEnding = value.name.split(".").last()
    if (!(fileEnding === "png" || fileEnding === "jpg")) {
        errors.push("File peab olema JPG või PNG tüüpi!")
    }
    if (value.size > 25000000 ) {
        errors.push("File peab olema väiksem kui 25MB!")
    }
    return errors
}

export const cvValidation = value => {
    if (!value) return []
    let errors = []
    if (value.size > 25000000 ) {
        errors.push("File peab olema väiksem kui 25MB!")
    }
    return errors
}

export const registryCodeValidation = value => {
    let errors = []
    if (value.length !== 8) {
        errors.push("Registrikood peab olema 8 numbrit pikk!")
    }
    if (!(/^\d+$/.test(value))) {
        errors.push("Registrikood peab sisaldama ainult numbreid!")
    }
    return errors
}

export const emailValidation = value => {
    let errors = []
    if (!value) {
        errors.push("Email on sisestamata!")
    }
    if (!value.includes("@")) {
        errors.push("Ebakorrektne email!")
    }
    return errors
}

export const addressValidation = value => {
    return !value ? ["Aadress on sisestamata!"] : []
}

export const companyNameValidation = value => {
    return !value ? ["Ettevõtte nimi on sisestamata!"] : []
}