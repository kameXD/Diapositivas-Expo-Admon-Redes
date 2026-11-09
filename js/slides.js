/* Contenido editable. Fuente: informe entregado por el grupo. */
window.PRESENTATION_SLIDES = [
  {
    "section": "intro",
    "title": "Administración de redes",
    "lead": "",
    "cards": [],
    "presenter": "Equipo de exposición",
    "layout": "cover",
    "source": null
  },
  {
    "section": "intro",
    "title": "Introducción a la administración de redes",
    "lead": "Una red no solo necesita funcionar: también debemos conocer sus dispositivos, supervisar su estado y estar preparados para recuperarla cuando algo falla.",
    "cards": [
      {
        "title": "Descubrir y documentar",
        "text": "CDP y LLDP permiten conocer los equipos vecinos y sus conexiones."
      },
      {
        "title": "Sincronizar y supervisar",
        "text": "NTP organiza el tiempo; SNMP y Syslog ayudan a observar el estado y los eventos."
      },
      {
        "title": "Proteger la continuidad",
        "text": "Los respaldos y la administración de IOS facilitan la recuperación y el mantenimiento."
      }
    ],
    "presenter": "Equipo de exposición",
    "takeaway": "Administrar una red significa mantener información, control y capacidad de recuperación.",
    "source": {
      "title": "Introducción a la administración de redes",
      "level": 1
    }
  },
  {
    "section": "cdp",
    "title": "I. CDP y LLDP",
    "lead": "Cuando una red tiene varios routers y switches, una de las primeras tareas es identificar cómo están conectados.",
    "cards": [],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "flow": [
      {
        "title": "Equipos",
        "text": "Routers y switches comparten información."
      },
      {
        "title": "Vecinos",
        "text": "Cada dispositivo reconoce los equipos de su enlace."
      },
      {
        "title": "Topología",
        "text": "El administrador documenta las conexiones."
      }
    ],
    "takeaway": "CDP y LLDP permiten descubrir vecinos sin revisar manualmente cada cable.",
    "source": {
      "title": "I. CDP y LLDP",
      "level": 1
    }
  },
  {
    "section": "cdp",
    "title": "Definición de CDP y LLDP",
    "lead": "Ambos protocolos trabajan en la capa 2 del modelo OSI y permiten descubrir dispositivos conectados directamente.",
    "cards": [
      {
        "title": "CDP · Cisco Discovery Protocol",
        "text": "Es un protocolo propio de Cisco. Se utiliza entre equipos que lo admiten para anunciar su identidad y sus conexiones."
      },
      {
        "title": "LLDP · Link Layer Discovery Protocol",
        "text": "Es el estándar abierto IEEE 802.1AB. Facilita el descubrimiento entre equipos de distintos fabricantes."
      }
    ],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "takeaway": "Por ejemplo, podemos consultar qué switch está conectado a un router y por qué puertos.",
    "source": {
      "title": "• Definición de CDP y LLDP",
      "level": 2
    }
  },
  {
    "section": "cdp",
    "title": "Funcionamiento",
    "lead": "Los dispositivos envían anuncios periódicos. Sus vecinos reciben los datos y los conservan en una tabla de vecinos.",
    "cards": [],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "image": "image2.png",
    "imageAlt": "Dos switches intercambian anuncios periódicos y mantienen sus tablas de vecinos.",
    "table": {
      "headers": [
        "Valores predeterminados habituales",
        "CDP",
        "LLDP"
      ],
      "rows": [
        [
          "Intervalo de envío",
          "60 s",
          "30 s"
        ],
        [
          "Tiempo de retención",
          "180 s",
          "120 s"
        ],
        [
          "Multicast de destino",
          "01:00:0C:CC:CC:CC",
          "01:80:C2:00:00:0E"
        ]
      ]
    },
    "note": "Los anuncios usan campos TLV (tipo, longitud y valor) y no atraviesan otros enlaces. Si expira la retención sin recibir anuncios, se elimina la entrada.",
    "layout": "image-table",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    }
  },
  {
    "section": "cdp",
    "title": "Importancia del descubrimiento de vecinos",
    "lead": "Conocer qué equipo hay en cada puerto ayuda a documentar la red y a localizar errores de conexión.",
    "cards": [
      {
        "title": "Mapear la topología",
        "text": "Permite actualizar el diagrama de red sin depender de documentación antigua."
      },
      {
        "title": "Diagnosticar fallas",
        "text": "Identifica el dispositivo vecino y el puerto remoto al que llega una conexión."
      },
      {
        "title": "Verificar y limitar anuncios",
        "text": "Ayuda a detectar cables mal conectados. Conviene desactivar los anuncios en interfaces donde no sean necesarios, porque revelan datos del equipo."
      }
    ],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Importancia del descubrimiento de vecinos",
      "level": 2
    }
  },
  {
    "section": "cdp",
    "title": "Ejemplos en la administración de redes",
    "lead": "El descubrimiento de vecinos es especialmente útil cuando existen muchos equipos y conexiones.",
    "cards": [
      {
        "title": "Auditoría y cableado",
        "text": "Listar los vecinos de un switch permite reconstruir la topología y comprobar si cada puerto llega al equipo esperado."
      },
      {
        "title": "Telefonía IP",
        "text": "CDP y LLDP-MED pueden anunciar información de la VLAN de voz al teléfono, si los equipos están configurados para ello."
      },
      {
        "title": "Redes mixtas",
        "text": "LLDP permite descubrir vecinos en una infraestructura con equipos Cisco, HP, Juniper u otros fabricantes compatibles."
      }
    ],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Ejemplos en la administración de redes",
      "level": 2
    }
  },
  {
    "section": "cdp",
    "title": "Comandos principales",
    "lead": "En Cisco, las consultas muestran los vecinos; los comandos de configuración controlan dónde se anuncian los equipos.",
    "cards": [],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "table": {
      "headers": [
        "Comando",
        "Modo / utilidad"
      ],
      "rows": [
        [
          "show cdp neighbors",
          "Privilegiado · resumen de vecinos CDP"
        ],
        [
          "show cdp neighbors detail",
          "Privilegiado · IP, plataforma y versión del vecino"
        ],
        [
          "cdp run / no cdp run",
          "Configuración global · activar / desactivar CDP"
        ],
        [
          "no cdp enable",
          "Interfaz · desactivar CDP en ese enlace"
        ],
        [
          "lldp run",
          "Configuración global · activar LLDP"
        ],
        [
          "show lldp neighbors",
          "Privilegiado · resumen de vecinos LLDP"
        ],
        [
          "show lldp neighbors detail",
          "Privilegiado · información detallada"
        ],
        [
          "no lldp transmit\nno lldp receive",
          "Interfaz · desactivar envío y recepción por separado"
        ]
      ]
    },
    "commands": true,
    "note": "La disponibilidad de estos comandos depende del modelo y de la versión de IOS.",
    "source": {
      "title": "• Comandos principales",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "II. NTP (Network Time Protocol)",
    "lead": "Para interpretar lo que ocurre en una red, sus dispositivos necesitan una referencia de tiempo común.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "flow": [
      {
        "title": "Referencia",
        "text": "Un servidor ofrece información horaria."
      },
      {
        "title": "Sincronización",
        "text": "Los clientes ajustan sus relojes."
      },
      {
        "title": "Registros coherentes",
        "text": "Los eventos se pueden ordenar y comparar."
      }
    ],
    "takeaway": "Una hora consistente ayuda a reconstruir la secuencia de una falla.",
    "source": {
      "title": "II. NTP (Network Time Protocol)",
      "level": 1
    }
  },
  {
    "section": "ntp",
    "title": "Definición de NTP",
    "lead": "NTP sincroniza los relojes de routers, switches, servidores y otros dispositivos con una referencia de tiempo común.",
    "cards": [
      {
        "title": "El problema",
        "text": "Un router registra una falla a las 10:00, pero un switch la registra a las 10:37 porque su reloj está desajustado. Es difícil comparar los eventos."
      },
      {
        "title": "La solución",
        "text": "Con NTP, los equipos mantienen una referencia horaria consistente. Así podemos relacionar sus registros y comprender qué ocurrió primero."
      }
    ],
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Definición de NTP",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "Funcionamiento del protocolo NTP",
    "lead": "Un cliente intercambia información con un servidor de tiempo, compara la referencia con su reloj y realiza los ajustes necesarios.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "image": "image3.jpg",
    "imageAlt": "Un switch cliente NTP consulta a un router que actúa como cliente y servidor, conectado a un servidor NTP externo.",
    "note": "El intercambio se repite para mantener la sincronización. Un router puede recibir la hora de otro servidor y, a su vez, distribuirla a sus clientes.",
    "takeaway": "Ejemplo: 20 computadoras, 5 switches y 2 routers pueden compartir la misma referencia horaria.",
    "layout": "image",
    "source": {
      "title": "• Funcionamiento del protocolo NTP",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "Importancia de la sincronización horaria en una red",
    "lead": "Una hora coherente permite comparar registros de distintos equipos y reconstruir lo sucedido durante una falla.",
    "cards": [
      {
        "title": "Eventos y diagnóstico",
        "text": "Las marcas de tiempo permiten ordenar los sucesos y relacionar una caída de enlace con otros mensajes."
      },
      {
        "title": "Seguridad y control",
        "text": "Facilita la revisión de accesos, actividades sospechosas y cambios realizados en los dispositivos."
      },
      {
        "title": "Coordinación de servicios",
        "text": "Los sistemas que dependen de horarios precisos pueden trabajar con una referencia de tiempo común."
      }
    ],
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Importancia de la sincronización horaria en una red",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "Servidores y clientes NTP",
    "lead": "Los roles se distinguen por quién proporciona la referencia horaria y quién la utiliza.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "table": {
      "headers": [
        "Rol",
        "Función",
        "Ejemplo"
      ],
      "rows": [
        [
          "Servidor NTP",
          "Obtiene la hora de una fuente confiable y la distribuye a otros equipos.",
          "Servidor de tiempo o router configurado para ese rol."
        ],
        [
          "Cliente NTP",
          "Consulta al servidor y ajusta su reloj para mantenerse sincronizado.",
          "Router, switch, servidor o computadora."
        ]
      ]
    },
    "takeaway": "Un dispositivo puede ser cliente de una fuente y servidor para otros equipos.",
    "source": {
      "title": "• Servidores y clientes NTP",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "Ejemplos de aplicación en la administración de redes",
    "lead": "La sincronización facilita el control de la infraestructura tanto en empresas como en instituciones educativas.",
    "cards": [
      {
        "title": "En una empresa",
        "text": "Computadoras, switches y routers de varios departamentos utilizan un servidor NTP. Cuando hay una falla, sus registros se pueden comparar sin confusiones horarias."
      },
      {
        "title": "En una universidad",
        "text": "Los laboratorios y servidores mantienen la misma referencia de tiempo. Esto facilita revisar el control de accesos y los registros de actividad."
      }
    ],
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Ejemplos de aplicación en la administración de redes",
      "level": 2
    }
  },
  {
    "section": "ntp",
    "title": "Comandos principales de NTP en Cisco",
    "lead": "Configurar un servidor no basta: también debemos comprobar que el dispositivo esté sincronizado.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "table": {
      "headers": [
        "Comando",
        "Modo / utilidad"
      ],
      "rows": [
        [
          "ntp server <IP>",
          "Configuración global · definir el servidor NTP"
        ],
        [
          "show clock",
          "Privilegiado · consultar fecha y hora"
        ],
        [
          "show ntp status",
          "Privilegiado · verificar la sincronización"
        ],
        [
          "show ntp associations",
          "Privilegiado · consultar los servidores asociados"
        ],
        [
          "show running-config",
          "Privilegiado · revisar la configuración activa"
        ],
        [
          "clock timezone <nombre> <horas> [minutos]",
          "Configuración global · definir la zona horaria local"
        ]
      ]
    },
    "commands": true,
    "note": "Sustituye los parámetros entre < >. Para Honduras: clock timezone HN -6. La zona horaria cambia la visualización local, no sustituye a NTP.",
    "source": {
      "title": "• Comandos principales de NTP en Cisco",
      "level": 2
    }
  },
  {
    "section": "snmp",
    "title": "III. SNMP (Simple Network Management Protocol)",
    "lead": "Después de descubrir los equipos y sincronizar sus relojes, necesitamos conocer su estado y detectar posibles problemas.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": [
      {
        "title": "Consultar",
        "text": "Una plataforma central solicita información."
      },
      {
        "title": "Observar",
        "text": "Los agentes responden con datos del equipo."
      },
      {
        "title": "Actuar",
        "text": "El administrador identifica y atiende fallas."
      }
    ],
    "takeaway": "SNMP permite supervisar múltiples dispositivos desde un punto central.",
    "source": {
      "title": "III. SNMP (Simple Network Management Protocol)",
      "level": 1
    }
  },
  {
    "section": "snmp",
    "title": "Definición",
    "lead": "SNMP es un protocolo que permite supervisar desde un sistema central equipos como routers, switches, servidores e impresoras.",
    "cards": [
      {
        "title": "Una vista centralizada",
        "text": "El administrador consulta información de distintos dispositivos desde una plataforma de monitoreo, sin desplazarse a cada uno."
      },
      {
        "title": "Un ejemplo cotidiano",
        "text": "Podemos comprobar si un puerto del switch está activo y revisar su tráfico para investigar una conexión lenta."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "takeaway": "La información del dispositivo se convierte en datos útiles para el monitoreo.",
    "source": {
      "title": "• Definición",
      "level": 2
    }
  },
  {
    "section": "snmp",
    "title": "Funcionamiento",
    "lead": "SNMP utiliza un administrador que realiza consultas y un agente en cada dispositivo supervisado que responde con información.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": [
      {
        "title": "Administrador SNMP",
        "text": "Solicita datos desde la plataforma de monitoreo."
      },
      {
        "title": "Agente del equipo",
        "text": "Consulta el estado local y responde."
      },
      {
        "title": "Datos y notificaciones",
        "text": "El sistema muestra interfaces, tráfico y eventos."
      }
    ],
    "note": "Además de responder consultas, un agente puede enviar notificaciones cuando ocurre un evento importante. No toda la supervisión depende de esperar a la próxima consulta.",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    }
  },
  {
    "section": "snmp",
    "title": "Importancia",
    "lead": "El monitoreo continuo ayuda a detectar problemas antes de que afecten a muchos usuarios y permite administrar varios equipos desde una misma plataforma.",
    "cards": [
      {
        "title": "Detectar fallas",
        "text": "Un puerto inactivo o un equipo que deja de responder requiere revisión del administrador."
      },
      {
        "title": "Revisar el rendimiento",
        "text": "La información de tráfico y uso de recursos ayuda a reconocer saturación o comportamientos inusuales."
      },
      {
        "title": "Planificar mejoras",
        "text": "El historial de datos facilita identificar necesidades de capacidad y aprovechar mejor la infraestructura."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Importancia",
      "level": 2
    }
  },
  {
    "section": "snmp",
    "title": "Ejemplos de aplicación",
    "lead": "Las consultas de SNMP permiten observar disponibilidad y rendimiento en distintos entornos.",
    "cards": [
      {
        "title": "Empresa · switches y routers",
        "text": "El administrador supervisa el tráfico de los puertos y localiza equipos con problemas para dirigir la revisión técnica."
      },
      {
        "title": "Institución educativa · Wi-Fi y laboratorios",
        "text": "El equipo de tecnología comprueba la disponibilidad de los puntos de acceso y el rendimiento de los equipos de red."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "takeaway": "El monitoreo orienta la investigación; los datos deben interpretarse junto con el contexto de la red.",
    "source": {
      "title": "• Ejemplos de aplicación",
      "level": 2
    }
  },
  {
    "section": "syslog",
    "title": "IV. Syslog",
    "lead": "Conocer el estado actual de un equipo es útil, pero también necesitamos un historial de lo que ocurrió en él.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": [
      {
        "title": "Evento",
        "text": "Una interfaz cae o se produce un intento de acceso."
      },
      {
        "title": "Mensaje",
        "text": "El equipo registra información de lo sucedido."
      },
      {
        "title": "Historial",
        "text": "El administrador consulta y relaciona los registros."
      }
    ],
    "takeaway": "Syslog complementa el monitoreo al conservar evidencia de los eventos.",
    "source": {
      "title": "IV. Syslog",
      "level": 1
    }
  },
  {
    "section": "syslog",
    "title": "Definición",
    "lead": "Syslog es un mecanismo para generar, enviar y almacenar mensajes sobre eventos de los dispositivos de red.",
    "cards": [
      {
        "title": "¿Qué se registra?",
        "text": "Una interfaz que se desconecta, un error del sistema, un intento de acceso o un cambio de configuración pueden generar mensajes."
      },
      {
        "title": "¿Para qué sirve?",
        "text": "Los registros permiten investigar un problema después de que sucede y revisar la actividad de varios equipos."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "takeaway": "Mientras SNMP ayuda a consultar cómo está un equipo, Syslog ayuda a saber qué ocurrió.",
    "source": {
      "title": "• Definición",
      "level": 2
    }
  },
  {
    "section": "syslog",
    "title": "Funcionamiento",
    "lead": "Cuando ocurre un evento, el dispositivo genera un mensaje. Puede guardarlo localmente o enviarlo a un servidor Syslog.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": [
      {
        "title": "Dispositivo",
        "text": "Genera el mensaje al detectar el evento."
      },
      {
        "title": "Servidor Syslog",
        "text": "Recibe y conserva registros de varios equipos."
      },
      {
        "title": "Administrador",
        "text": "Consulta el historial y relaciona los sucesos."
      }
    ],
    "note": "El mensaje incluye información sobre lo sucedido y un nivel de severidad. Una referencia horaria común mediante NTP facilita ordenar y comparar los registros.",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    }
  },
  {
    "section": "syslog",
    "title": "Importancia",
    "lead": "Mantener un historial de eventos permite investigar errores y revisar actividades relacionadas con la seguridad.",
    "cards": [
      {
        "title": "Diagnóstico de errores",
        "text": "Los mensajes ayudan a revisar qué sucedió antes, durante y después de una interrupción del servicio."
      },
      {
        "title": "Seguimiento de cambios",
        "text": "Los registros pueden mostrar cambios de configuración y actividad relevante en los equipos."
      },
      {
        "title": "Investigación de seguridad",
        "text": "Los intentos de acceso y otros eventos sospechosos aportan información para analizar un incidente."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Importancia",
      "level": 2
    }
  },
  {
    "section": "syslog",
    "title": "Ejemplos de aplicación",
    "lead": "Los registros centralizados permiten encontrar relaciones entre eventos de diferentes dispositivos.",
    "cards": [
      {
        "title": "En una empresa",
        "text": "Un servidor Syslog reúne mensajes de routers, switches y firewalls. El administrador revisa errores de conexión y posibles fallos de configuración."
      },
      {
        "title": "En una institución financiera",
        "text": "Los intentos de acceso fallidos y otros acontecimientos de seguridad quedan registrados para facilitar la investigación."
      }
    ],
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Ejemplos de aplicación",
      "level": 2
    }
  },
  {
    "section": "syslog",
    "title": "Aplicación conjunta de SNMP y Syslog",
    "lead": "Si una conexión deja de funcionar, ambas herramientas aportan información diferente para comprender el problema.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "table": {
      "headers": [
        "Herramienta",
        "Qué permite revisar",
        "En una caída de enlace"
      ],
      "rows": [
        [
          "SNMP",
          "Estado y datos de los dispositivos supervisados.",
          "Consultar si la interfaz está activa y revisar su tráfico."
        ],
        [
          "Syslog",
          "Historial de eventos generados por los equipos.",
          "Revisar cuándo cayó el enlace y qué mensajes aparecieron."
        ],
        [
          "NTP como apoyo",
          "Una referencia horaria común para los registros.",
          "Relacionar los eventos de distintos equipos."
        ]
      ]
    },
    "takeaway": "Estado actual + historial de eventos = un diagnóstico mejor fundamentado.",
    "source": {
      "title": "• Aplicación conjunta de SNMP y Syslog",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "V. Respaldo de configuraciones y administración de imágenes IOS",
    "lead": "Supervisar una red no evita todos los errores. También debemos preparar su recuperación y mantener el software de los equipos.",
    "cards": [
      {
        "title": "Configuración",
        "text": "Define cómo funciona el equipo: interfaces, direcciones IP, VLAN y otros ajustes. Un respaldo permite recuperarlos."
      },
      {
        "title": "Imagen IOS",
        "text": "Contiene el sistema operativo. Administrarla exige revisar versión, compatibilidad y almacenamiento."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "La configuración y la imagen IOS cumplen funciones distintas; ambas requieren atención.",
    "source": {
      "title": "V. Respaldo de configuraciones y administración de imágenes IOS",
      "level": 1
    }
  },
  {
    "section": "backup",
    "title": "Introducción",
    "lead": "Hasta ahora hemos visto cómo descubrir equipos, sincronizar la hora y supervisar eventos. El siguiente paso es prepararnos para una falla o un reemplazo.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": [
      {
        "title": "Antes del cambio",
        "text": "Conservar una copia de los ajustes."
      },
      {
        "title": "Ante una falla",
        "text": "Revisar y recuperar una configuración conocida."
      },
      {
        "title": "En el mantenimiento",
        "text": "Comprobar el software y su compatibilidad."
      }
    ],
    "takeaway": "Respaldar y revisar IOS permite intervenir con una base de recuperación.",
    "source": {
      "title": "• Introducción",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "Respaldo de configuraciones",
    "lead": "Un respaldo es una copia de los ajustes del router o switch que se conserva para recuperarlos cuando sea necesario.",
    "cards": [
      {
        "title": "Cuándo ayuda",
        "text": "Si un cambio incorrecto interrumpe la red o un dispositivo debe reemplazarse, una copia anterior facilita recuperar sus parámetros."
      },
      {
        "title": "Dónde conservarlo",
        "text": "Podemos guardar los ajustes para el próximo inicio y mantener una copia externa, por ejemplo, en un servidor TFTP."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "Guardar la configuración en el equipo y conservar una copia externa son tareas complementarias.",
    "source": {
      "title": "• Respaldo de configuraciones",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "Definición e importancia de los respaldos",
    "lead": "Las direcciones IP, las interfaces y las VLAN forman parte de la configuración que necesitamos proteger.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": [
      {
        "title": "Configuración estable",
        "text": "El equipo funciona con ajustes conocidos."
      },
      {
        "title": "Copia de respaldo",
        "text": "Se conserva una versión antes de modificarla."
      },
      {
        "title": "Recuperación",
        "text": "Se revisa y utiliza la copia si el cambio falla."
      }
    ],
    "note": "Por ejemplo, si una modificación deja una red sin servicio, contar con una copia anterior evita reconstruir todos los ajustes desde cero.",
    "source": {
      "title": "• Definición e importancia de los respaldos",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "Importancia de los respaldos:",
    "lead": "Disponer de una copia útil reduce el trabajo necesario para recuperar un equipo y disminuye el impacto de una falla.",
    "cards": [
      {
        "title": "Conservar el trabajo",
        "text": "Evita perder ajustes importantes y facilita recuperar versiones anteriores."
      },
      {
        "title": "Reducir interrupciones",
        "text": "Ayuda a restablecer los servicios con mayor rapidez después de una falla o un cambio incorrecto."
      },
      {
        "title": "Facilitar el mantenimiento",
        "text": "Ofrece una referencia conocida para revisar, reemplazar o volver a configurar los dispositivos."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "Importancia de los respaldos:",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "Diferencias entre running-config y startup-config",
    "lead": "En Cisco debemos distinguir la configuración que está activa de la que se carga al iniciar el equipo.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "table": {
      "headers": [
        "Característica",
        "running-config",
        "startup-config"
      ],
      "rows": [
        [
          "Ubicación habitual",
          "RAM",
          "NVRAM"
        ],
        [
          "Función",
          "Configuración activa del dispositivo.",
          "Configuración que se carga al iniciar."
        ],
        [
          "Persistencia",
          "Los cambios sin guardar se pierden al reiniciar.",
          "Permanece guardada después de apagar."
        ],
        [
          "Actualización",
          "Cambia al introducir comandos.",
          "Cambia al guardar la configuración."
        ]
      ]
    },
    "takeaway": "copy running-config startup-config guarda los ajustes activos para el próximo inicio.",
    "source": {
      "title": "• Diferencias entre running-config y startup-config",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "Métodos de respaldo y restauración",
    "lead": "Podemos guardar la configuración en el dispositivo o copiarla a un servidor TFTP para conservarla fuera del equipo.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "table": {
      "headers": [
        "Comando · modo privilegiado",
        "Utilidad"
      ],
      "rows": [
        [
          "copy running-config startup-config",
          "Guardar los ajustes activos para el próximo inicio."
        ],
        [
          "copy running-config tftp:",
          "Enviar un respaldo al servidor TFTP."
        ],
        [
          "copy tftp: running-config",
          "Cargar comandos del respaldo en la configuración activa."
        ],
        [
          "copy tftp: startup-config",
          "Copiar el respaldo a la configuración de inicio."
        ]
      ]
    },
    "commands": true,
    "note": "TFTP solicita la IP del servidor y el nombre del archivo; no cifra la transferencia. Al copiar hacia running-config, los comandos pueden combinarse con los ajustes actuales. Revisa el archivo y conserva otra copia antes de restaurar.",
    "source": {
      "title": "• Métodos de respaldo y restauración",
      "level": 2
    }
  },
  {
    "section": "ios",
    "title": "VI. Administración de imágenes IOS",
    "lead": "Además de las configuraciones, debemos conocer el software que permite funcionar a los routers y switches.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": [
      {
        "title": "Identificar",
        "text": "Conocer el modelo y la versión instalada."
      },
      {
        "title": "Verificar",
        "text": "Revisar compatibilidad y espacio disponible."
      },
      {
        "title": "Preparar",
        "text": "Respaldar la configuración antes de actualizar."
      }
    ],
    "takeaway": "Administrar una imagen IOS requiere comprobar que sea adecuada para el dispositivo.",
    "source": {
      "title": "VI. Administración de imágenes IOS",
      "level": 2
    }
  },
  {
    "section": "ios",
    "title": "¿Qué es Cisco IOS?",
    "lead": "Cisco IOS es el sistema operativo utilizado por numerosos routers y switches Cisco para ofrecer funciones de comunicación y administración.",
    "cards": [
      {
        "title": "Funciones del sistema",
        "text": "Permite configurar interfaces, rutas, VLAN y funciones de seguridad compatibles con el equipo."
      },
      {
        "title": "Antes de cambiarlo",
        "text": "Es necesario confirmar la compatibilidad de la imagen con el modelo y disponer de un respaldo de la configuración."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "IOS es el software del dispositivo; la configuración indica cómo debe funcionar en nuestra red.",
    "source": {
      "title": "• ¿Qué es Cisco IOS?",
      "level": 2
    }
  },
  {
    "section": "ios",
    "title": "¿Qué son las imágenes IOS y para qué sirven?",
    "lead": "Una imagen IOS es el archivo que contiene el sistema operativo que utiliza un dispositivo Cisco.",
    "cards": [
      {
        "title": "Operación del equipo",
        "text": "Incluye las instrucciones y funciones necesarias para la comunicación y la administración."
      },
      {
        "title": "Protocolos y seguridad",
        "text": "Proporciona las funciones compatibles con la versión del software y con el modelo del dispositivo."
      },
      {
        "title": "Mantenimiento",
        "text": "Permite instalar una versión adecuada cuando es necesario actualizar o recuperar el software."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "Las características disponibles dependen de la imagen, la versión y el modelo; no todas las imágenes son intercambiables.",
    "source": {
      "title": "• ¿Qué son las imágenes IOS y para qué sirven?",
      "level": 2
    }
  },
  {
    "section": "ios",
    "title": "Ejemplos de aplicación en la administración de redes",
    "lead": "El respaldo de ajustes y la revisión del software forman parte del mantenimiento en empresas e instituciones educativas.",
    "cards": [
      {
        "title": "Router empresarial",
        "text": "El administrador respalda por TFTP el router que conecta los departamentos e Internet. Si necesita recuperarlo, dispone de una copia de sus ajustes."
      },
      {
        "title": "Switch de laboratorios",
        "text": "Si se modifican por error las VLAN, se revisa y restaura un respaldo anterior. Si también se requiere cambiar IOS, primero se verifica la compatibilidad de la imagen."
      }
    ],
    "presenter": "Angel Michael Acosta Maldonado",
    "note": "Restaurar una configuración recupera ajustes; administrar una imagen IOS atiende el sistema operativo. Son operaciones diferentes.",
    "source": {
      "title": "• Ejemplos de aplicación en la administración de redes",
      "level": 2
    }
  },
  {
    "section": "demo",
    "title": "Demostración práctica en Cisco Packet Tracer",
    "lead": "Pasamos de los conceptos a su observación en una topología de práctica.",
    "cards": [
      {
        "title": "Conectar la teoría con los equipos",
        "text": "La demostración se realizará directamente en Cisco Packet Tracer, fuera de esta presentación."
      },
      {
        "title": "Observar y relacionar",
        "text": "Utilizaremos los conceptos estudiados para interpretar las conexiones, el tiempo, el monitoreo y la recuperación."
      }
    ],
    "presenter": "Karin Jafet Mejia Maradiaga",
    "takeaway": "La demostración y sus resultados se mostrarán en vivo, a cargo de Karin Jafet Mejia Maradiaga.",
    "source": null
  },
  {
    "section": "end",
    "title": "Conclusión",
    "lead": "Estas tecnologías cumplen funciones distintas y, utilizadas juntas, permiten administrar la red de manera más organizada y confiable.",
    "cards": [
      {
        "title": "Conocer la red",
        "text": "CDP y LLDP identifican vecinos y conexiones; NTP proporciona una referencia horaria para relacionar los eventos."
      },
      {
        "title": "Comprender lo que ocurre",
        "text": "SNMP permite supervisar el estado y el rendimiento. Syslog conserva el historial que ayuda a investigar incidentes."
      },
      {
        "title": "Mantener y recuperar",
        "text": "Los respaldos permiten recuperar ajustes; la administración de IOS ayuda a mantener un sistema operativo adecuado."
      }
    ],
    "presenter": "Karin Jafet Mejia Maradiaga",
    "takeaway": "Una red administrada se puede documentar, observar, diagnosticar y recuperar.",
    "source": {
      "title": "Conclusión",
      "level": 1
    }
  }
];
