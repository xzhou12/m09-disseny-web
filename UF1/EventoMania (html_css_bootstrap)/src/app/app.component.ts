import { Component, OnInit } from '@angular/core';
import { Evento } from './models/evento.model';
import data from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  eventos: Evento[] = [];
  hoy = new Date();
  proximosEventos: Evento[] = [];
  eventosPasados: Evento[] = [];
  direcciones: string[] = [];

  direccionSeleccionada: string = 'all';

  ngOnInit() {
    // Cargamos el fichero JSON
    const json: any = data;

    // Guardamos el fichero cargado en el array de Eventos
    this.eventos = json;

    // Convertimos las fechas a tipo Date
    this.eventos.map((value) => value.fecha = new Date(value.fecha));

    this.proximosEventos = this.eventos.filter(evento => evento.fecha >= this.hoy);
    this.eventosPasados = this.eventos.filter(evento => evento.fecha < this.hoy);
    this.direcciones = Array.from(new Set(this.eventos.map(evento => evento.direccion)));
  }

  direccionCambiada() {
    this.filtroEventos();
  }

  filtroEventos() {
    this.proximosEventos = this.eventos.filter(
      evento => evento.fecha >= this.hoy && (this.direccionSeleccionada == 'all' || evento.direccion == this.direccionSeleccionada)
    );

    this.eventosPasados = this.eventos.filter(
      evento => evento.fecha < this.hoy && (this.direccionSeleccionada == 'all' || evento.direccion == this.direccionSeleccionada)
    );
  }

}
