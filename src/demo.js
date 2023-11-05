import React, { Component } from 'react'
import "./style.css"
import VentaRadiador from './ventaRadiador'
import CatalogoAuto from './catalogoAuto'
import CatalogoProducto from './catalogoProducto'

export default class demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catalogoAuto: false,
            catalogoProducto: false,
            ventaRadiador: false
        }
    }

    mostrarCatalogoAuto = () => {
        this.setState({ 
            catalogoAuto: !this.state.catalogoAuto,
            catalogoProducto: false,
            ventaRadiador: false 
        })
    }

    mostrarCatalogoProducto = () => {
        this.setState({ 
            catalogoAuto: false,
            catalogoProducto: !this.state.catalogoProducto,
            ventaRadiador: false 
        })
    }

    mostrarVentaRadiador = () => {
        this.setState({ 
            catalogoAuto: false,
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
                            <a href="#" onClick={this.mostrarCatalogoAuto}>Auto</a>
                        </li>
                        <li>
                            Tipo de producto (radiador, tapa, ventilador, accesorio)
                        </li>
                        <li>
                            Proveedor
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
                {this.state.catalogoAuto &&
                    <CatalogoAuto />
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