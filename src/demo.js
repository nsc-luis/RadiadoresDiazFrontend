import React, { Component } from 'react'
import axios from 'axios'
import g from './global'

export default class demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaYears: [],
            year: "0",
            idMarca: "0",
            marcas: [],
            autos: [],
            idAuto: "0"
        }
    }
    listaYears = async () => {
        await axios.get(`${g.url_api}/auto/listaYears`)
            .then(res => {
                this.setState({ listaYears: res.data })
            })
    }

    marcaPorYear = async (year) => {
        await axios.get(`${g.url_api}/marca/PorYear?year=${year}`)
            .then(res => {
                this.setState({ marcas: res.data })
            })
    }

    modeloPorMarcaYear = async (year) => {
        await axios.get(`${g.url_api}/marca/PorYear?year=${year}`)
            .then(res => {
                this.setState({ marcas: res.data })
            })
    }

    componentDidMount() {
        this.listaYears()
        this.marcaPorYear(this.state.idMarca)
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === "year") {
            this.marcaPorYear(e.target.value)
        }
    }

    render() {
        return (
            <>
                <p>
                    <select
                        name="year"
                        value={this.state.year}
                        onChange={this.onChange}
                    >
                        <option value="0">Selecciona una año</option>
                        {this.state.listaYears.map((year) => {
                            return (
                                <option key={year}>{year}</option>
                            )
                        })}
                    </select><br />
                    Año:
                </p>
                <p>
                    <select
                        name="idMarca"
                        value={this.state.idMarca}
                        onChange={this.onChange}
                    >
                        <option value="0">Selecciona una marca</option>
                        {this.state.marcas.map((marca) => {
                            return (
                                <option key={marca}>{marca}</option>
                            )
                        })}
                    </select><br />
                    Marca:
                </p>
                <p>
                    <select
                        name="idAuto"
                        value={this.state.idAuto}
                        onChange={this.onChange}
                    >
                        <option value="0">Selecciona un auto</option>
                        {this.state.autos.map((auto) => {
                            return (
                                <option key={auto}>{auto}</option>
                            )
                        })}
                    </select><br />
                    Modelo:
                </p>
            </>
        )
    }
}