import React, { Component } from 'react'
import VentaRadiador from './ventaRadiador'
import CatalogoAuto from './catalogoAuto'
import CatalogoProducto from './catalogoProducto'
import CatalogoMarca from './catalogoMarca'
import CatalogoProveedor from './catalogoProveedor'
import './style.css'

export default class demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catalogoMarca: false,
            catalogoAuto: false,
            catalogoProveedor: false,
            catalogoProducto: false,
            ventaRadiador: false
        }
    }

    mostrarCatalogoMarca = () => {
        this.setState({
            catalogoMarca: !this.state.catalogoMarca,
            catalogoAuto: false,
            catalogoProveedor: false,
            catalogoProducto: false,
            ventaRadiador: false
        })
    }

    mostrarCatalogoAuto = () => {
        this.setState({
            catalogoMarca: false,
            catalogoAuto: !this.state.catalogoAuto,
            catalogoProveedor: false,
            catalogoProducto: false,
            ventaRadiador: false
        })
    }

    mostrarCatalogoProveedor = () => {
        this.setState({
            catalogoMarca: false,
            catalogoAuto: false,
            catalogoProveedor: !this.state.catalogoProveedor,
            catalogoProducto: false,
            ventaRadiador: false
        })
    }

    mostrarCatalogoProducto = () => {
        this.setState({
            catalogoMarca: false,
            catalogoAuto: false,
            catalogoProveedor: false,
            catalogoProducto: !this.state.catalogoProducto,
            ventaRadiador: false
        })
    }

    mostrarVentaRadiador = () => {
        this.setState({
            catalogoMarca: false,
            catalogoAuto: false,
            catalogoProveedor: false,
            catalogoProducto: false,
            ventaRadiador: !this.state.ventaRadiador
        })
    }

    render() {
        return (
            <>
                <h3>LAS OPCIONES SUBRAYADAS ESTAN DISPONIBLES PARA LA DEMO Y LOS DATOS MOSTRADOS SON DE PRUEBA</h3>
                <ul>
                    <li className='menuNav'>
                        CATALOGO
                    </li>
                    <ul>
                        <li>
                            <a href="#" onClick={this.mostrarCatalogoMarca}>Marca</a>
                        </li>
                        <li>
                            <a href="#" onClick={this.mostrarCatalogoAuto}>Auto</a>
                        </li>
                        <li>
                            Tipo de producto (radiador, tapa, ventilador, accesorio)
                        </li>
                        <li>
                        <a href="#" onClick={this.mostrarCatalogoProveedor}>Proveedor</a>
                        </li>
                        <li>
                            <a href="#" onClick={this.mostrarCatalogoProducto}>Producto</a>
                        </li>
                    </ul>

                    <li>
                        VENTA
                        <ul>
                            <li>
                                <a href="#" onClick={this.mostrarVentaRadiador}>Radiador</a>
                            </li>
                            <li>
                                Tapa
                            </li>
                            <li>
                                Ventilador
                            </li>
                            <li>
                                Accesorio
                            </li>
                        </ul>
                    </li>
                </ul>

                <hr />
                {this.state.catalogoMarca &&
                    <CatalogoMarca />
                }

                {this.state.catalogoAuto &&
                    <CatalogoAuto />
                }

                {this.state.catalogoProveedor &&
                    <CatalogoProveedor />
                }

                {this.state.catalogoProducto &&
                    <CatalogoProducto />
                }

                {this.state.ventaRadiador &&
                    <VentaRadiador />
                }
            </>
        )
    }
}