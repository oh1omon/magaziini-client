class Validator {
	/**
	 * Performs checking password for errors and length
	 * @param {string} password
	 * @returns {array} string array, that contains error field's names
	 */
	password(password: any, err: string[]) {
		if (typeof password !== 'string' || password.length < 8) {
			err.push('password')
		}

		return err
	}

	/**
	 * Performs checking email for errors
	 * @param {string} email
	 * @returns {array} string array, that contains error field's names
	 */
	email(email: any, err: string[]) {
		if (typeof email !== 'string') {
			err.push('email')
		} else {
			const testRes =
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
					email
				)
			if (!testRes) {
				err.push('email')
			}
		}

		return err
	}

	/**
	 * Performs checking signUp object for errors, for example it checks email with regex and password to be at least 8 symbols
	 * @param {object} formObject
	 * @returns {array} string array, that contains error field's names
	 */
	signUp(formObject: ISignUpProps) {
		const err: string[] = []

		this.email(formObject?.email, err)
		this.password(formObject?.password, err)

		if (!formObject.name) {
			err.push('name')
		}
		return err
	}

	/**
	 * Performs checking signIn object for errors, for example it checks email with regex and password to be at least 8 symbols
	 * @param {object} formObject
	 * @returns {array} string array, that contains error field's names
	 */
	signIn(formObject: ILoginUserProps) {
		const err: string[] = []

		this.email(formObject.email, err)
		this.password(formObject?.password, err)

		return err
	}

	/**
	 * Performs validation of item object
	 * @param {ICreateItemProps} createObj
	 * @returns {array} string array, that contains error field's names
	 */
	createItem(createObj: ICreateItemProps) {
		let err: string[] = []
		if (!createObj.name) {
			err.push('name')
		}
		if (!createObj.description) {
			err.push('description')
		}
		if (!createObj.photo) {
			err.push('photo')
		}
		if (!createObj.sex) {
			err.push('sex')
		}
		if (!createObj.sizes) {
			err.push('sizes')
		}
		if (!createObj.price || isNaN(parseInt(createObj.price))) {
			err.push('price')
		}
		return err
	}
}

export default new Validator()
