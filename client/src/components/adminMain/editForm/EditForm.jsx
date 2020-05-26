import React, { Component } from 'react';
import { Field, reduxForm, isValid, isInvalid } from 'redux-form';
import { connect } from 'react-redux';
import styles from './EditForm.module.css'
import { fetchEditCoin, createCoin } from '../../../actions';
import history from '../../../components/history';
import { NavLink } from 'react-router-dom';
import ModalAdmin from '../../modal/ModalAdmin'

const required = value => value ? undefined : 'Required!';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;


class EditForm extends Component {

    static defaultProps = {
        previewLogoUrl: ``,
        mimeType: "image/jpeg, image/png",
        maxWeight: 3000,
        maxWidth: 2000,
        maxHeight: 2000
    };

    validateImageWeight = imageFile => {
        if (imageFile && imageFile.size) {
            const imageFileKb = imageFile.size / 1024;
            const { maxWeight } = this.props;
            if (imageFileKb > maxWeight) {
                return `Image size must be less or equal to ${maxWeight}kb`;
            }
        }
    };

    validateImageWidth = imageFile => {
        if (imageFile) {
            const { maxWidth } = this.props;
            if (imageFile.width > maxWidth) {
                return `Image width must be less or equal to ${maxWidth}px`;
            }
        }
    };

    validateImageHeight = imageFile => {
        if (imageFile) {
            const { maxHeight } = this.props;
            if (imageFile.height > maxHeight) {
                return `Image height must be less or equal to ${maxHeight}px`;
            }
        }
    };

    validateImageFormat = imageFile => {
        if (imageFile) {
            const { mimeType } = this.props;
            if (!mimeType.includes(imageFile.type)) {
                return `Image mime type must be ${mimeType}`;
            }
        }
    };

    handlePreview = (imageUrl, name) => {
        let previewImageDom = ''
        if (name === 'image_averse') {
            previewImageDom = document.querySelector(`.${styles.image_averse}`);
        } else {
            previewImageDom = document.querySelector(`.${styles.image_reverse}`);
        }

        previewImageDom.src = imageUrl;
    };

    handleChange = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObject = new window.Image();

            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
            };
            imageObject.src = localImageUrl;
            this.handlePreview(localImageUrl, event.target.name);
        }
    };

    renderField = ({ label, input, type, meta: { touched, error, warning } }) => {
        return (
            <div>
                <label>{label}</label>
                <input type={type} {...input} className="form-control" />
                {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }

    renderFileAverse = ({ label, input, type, meta }) => {
        // delete input.value
        const { mimeType } = this.props;
        let logoUrl = ''
        if (this.props.initialValues === undefined) {
            logoUrl = `https://cdn.shopify.com/s/files/1/0414/6957/products/2020-COMMONWEALTH-Effigy_ROUND-OBV-AlBr-UNC1_2048x.jpg?v=1572486038`
        } else {
            logoUrl = `/image/${this.props.initialValues.image_averse}`
        }
        return (
            <div className={styles.upload}>
                <img
                    src={logoUrl}
                    alt="preview"
                    className={styles.image_averse}
                />
                <label>{label}</label>
                <input type={type}
                    name={input.name}
                    onChange={this.handleChange}
                    accept={mimeType}
                    onChange={event => this.handleChange(event, input)} />
                {meta.touched && (meta && meta.invalid && meta.error && (
                    <p className={styles.error}>{meta.error}</p>
                ))}
            </div>
        )
    }

    renderFileReverse = ({ label, input, type, meta }) => {
        // delete input.value
        const { mimeType } = this.props;
        let logoUrl = ''
        if (this.props.initialValues === undefined) {
            logoUrl = `https://cdn.shopify.com/s/files/1/0414/6957/products/2020-COMMONWEALTH-Effigy_ROUND-OBV-AlBr-UNC1_2048x.jpg?v=1572486038`
        } else {
            logoUrl = `/image/${this.props.initialValues.image_reverse}`
        }
        return (
            <div className={styles.upload}>
                <img
                    src={logoUrl}
                    alt="preview"
                    className={styles.image_reverse}
                />
                <label>{label}</label>
                <input type={type}
                    name={input.name}
                    onChange={this.handleChange}
                    accept={mimeType}
                    onChange={event => this.handleChange(event, input)} />
                {meta.touched && (meta && meta.invalid && meta.error && (
                    <p className={styles.error}>{meta.error}</p>
                ))}
            </div>
        )
    }

    onSubmit = (values) => {
        if (window.location.pathname === '/admin/create') {
            this.props.createCoin(values)
        } else {
            this.props.fetchEditCoin(values);
        }
    }
    render() {
        const { container, btns, width } = styles;
        if (!this.props.isAdmin === 1) {
            return (<div className='container'>
                <div>You are not logged in as admin! Please, <NavLink exact to='/login'>login</NavLink></div>
            </div>)
        } else {
            return (
                <>
                    <div className='container'>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={container}>
                            <Field type='text' validate={required} name='name' label='Coin name' component={this.renderField} />
                            <Field type='textarea' validate={required} name='short_description' label='Short description' component={this.renderField} />
                            <Field type='file' name='image_averse' label='Upload the averse' validate={[
                                required,
                                this.validateImageWeight,
                                this.validateImageWidth,
                                this.validateImageHeight,
                                this.validateImageFormat
                            ]} component={this.renderFileAverse} />
                            <Field type='text' validate={required} name='face_value' label='Face value' component={this.renderField} />
                            <Field type='text' validate={required} name='coin_type' label='Coin type' component={this.renderField} />
                            <Field type='text' validate={required} name='country' label='Country' component={this.renderField} />
                            <Field type='text' validate={[required, number]} name='issue_year' label='Year of issue' component={this.renderField} />
                            <Field type='file' validate={[
                                required,
                                this.validateImageWeight,
                                this.validateImageWidth,
                                this.validateImageHeight,
                                this.validateImageFormat
                            ]} name='image_reverse' label='Upload the reverse' component={this.renderFileReverse} />
                            <Field type='textarea' validate={required} name='full_description' label='Long description' component={this.renderField} />
                            <Field type='text' validate={[required, number]} name='price' label='Price' component={this.renderField} />
                            <Field type='text' validate={required} name='quality' label='Quality' component={this.renderField} />
                            <Field type='text' name='weight' validate={required} label='Weight' component={this.renderField} />
                            <div className={btns}>
                                <button type='submit' className="btn btn-primary" disabled={this.props.valid ? false : true}>Save                                 {
                                    this.props.createdCoin.isFetching ? <div class='spinner-border' style={{width: '1rem', height: '1rem'}} role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> : null
                                }
                                </button>
                                <button onClick={() => {
                                    history.push('/admin');
                                }} className="btn btn-secondary">Cancel</button>
                            </div>
                            <Field type='text' name='metal' validate={required} label='Metal' component={this.renderField} />
                        </form>
                    </div>
                    {
                        this.props.modalCreateEdit && <ModalAdmin />
                    }
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.isAdmin,
        createdCoin: state.createdCoin,
        modalCreateEdit: state.modalCreateEdit,
        createEditForm: state.createEditForm,
        valid: isValid('createEditForm')(state)
    }
}

export default reduxForm({
    form: 'createEditForm'
})(connect(mapStateToProps, { fetchEditCoin, createCoin })(EditForm))