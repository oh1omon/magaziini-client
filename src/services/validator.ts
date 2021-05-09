class Validator {
	/**
	 *	Perfoms checking signUp object for errors, for example it checks email with regex and password to be at least 8 symbols
	 * @param {object} formObject
	 * @returns {array} error array
	 */
	signUp(formObject: ISignUpProps) {
		const err = []

		if (!formObject.email) {
			err.push('email')
		} else {
			const testRes = /^[^\s@]+@[^\s@]+$/.test(formObject.email)
			if (!testRes) {
				err.push('email')
			}
		}
		if (!formObject.password || formObject.password.length < 8) {
			err.push('password')
		}
		if (!formObject.name) {
			err.push('name')
		}
		return err
	}

	/**
	 *	Perfoms checking signIn object for errors, for example it checks email with regex and password to be at least 8 symbols     * @param {object} formObject
	 * @returns {array} error array
	 */
	signIn(formObject: ILoginUserProps) {
		const err = []

		if (!formObject.email) {
			err.push('email')
		} else {
			const testRes = /^[^\s@]+@[^\s@]+$/.test(formObject.email)
			if (!testRes) {
				err.push('email')
			}
		}
		if (!formObject.password || formObject.password.length < 8) {
			err.push('password')
		}

		return err
	}

	createItem(createObj: ICreateItemProps) {
		let err: string[] = []
		if (!createObj.name) {
			err.push('name')
		}
		if (!createObj.description) {
			err.push('description')
		}
		if (!createObj.sex) {
			err.push('sex')
		}
		if (!createObj.sizes) {
			err.push('sizes')
		}
		if (!createObj.price) {
			err.push('price')
		}
		return err
	}
}

export default new Validator()
