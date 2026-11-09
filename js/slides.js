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
    "lead": "Una red no solo necesita estar conectada y funcionar. También debemos saber qué equipos la forman, detectar problemas y conservar la información necesaria para recuperarla cuando algo falla.",
    "cards": [
      {
        "title": "Descubrir y documentar",
        "text": "CDP y LLDP permiten conocer los equipos vecinos y sus conexiones."
      },
      {
        "title": "Sincronizar y supervisar",
        "text": "NTP mantiene una referencia horaria común. Con SNMP supervisamos los equipos y con Syslog revisamos los eventos que han ocurrido."
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
    "lead": "Cuando llegamos a una red con varios routers y switches, necesitamos saber cómo están conectados. CDP y LLDP permiten que los equipos anuncien su identidad a sus vecinos, de modo que podamos reconocer las conexiones sin seguir cada cable.",
    "cards": [],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "flow": null,
    "takeaway": "Al consultar la tabla de vecinos, podemos identificar el equipo conectado y los puertos que unen ambos dispositivos.",
    "source": {
      "title": "I. CDP y LLDP",
      "level": 1
    },
    "diagram": "neighbors"
  },
  {
    "section": "cdp",
    "title": "Definición de CDP y LLDP",
    "lead": "Para descubrir conexiones necesitamos que los equipos compartan información con sus vecinos. CDP y LLDP realizan esa tarea en la capa 2 del modelo OSI, aunque se diferencian por los fabricantes que los admiten.",
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
    "lead": "Cada equipo envía anuncios periódicos por sus interfaces. Los vecinos los reciben y guardan la información en una tabla, que el administrador puede consultar para reconocer las conexiones directas.",
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
    "lead": "La tabla de vecinos nos ayuda a comprobar si las conexiones reales coinciden con el diseño de la red. Cuando aparece una falla, esta información permite dirigir la revisión al equipo y al puerto correctos.",
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
        "text": "Los anuncios ayudan a detectar conexiones incorrectas, pero también revelan datos del equipo. Por eso conviene desactivarlos en las interfaces donde no se necesitan."
      }
    ],
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Importancia del descubrimiento de vecinos",
      "level": 2
    },
    "visual": "benefits"
  },
  {
    "section": "cdp",
    "title": "Ejemplos en la administración de redes",
    "lead": "En una red con muchos equipos, conocer los vecinos permite resolver tareas concretas de documentación y configuración. Estos son tres ejemplos de cómo se aprovecha esa información.",
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
    },
    "visual": "cases"
  },
  {
    "section": "cdp",
    "title": "Comandos principales",
    "lead": "Para comprobar las conexiones en Cisco, primero consultamos los vecinos con los comandos show. Si necesitamos controlar los anuncios, utilizamos los comandos de configuración global o de interfaz que aparecen a continuación.",
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
    "lead": "Después de identificar las conexiones, necesitamos que los equipos coincidan al registrar la hora. NTP sincroniza sus relojes con una referencia común; así podemos comparar los eventos de distintos dispositivos y reconstruir lo ocurrido durante una falla.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "flow": null,
    "takeaway": "El servidor proporciona la referencia horaria y los clientes intercambian información con él para ajustar sus relojes.",
    "source": {
      "title": "II. NTP (Network Time Protocol)",
      "level": 1
    },
    "diagram": "ntp"
  },
  {
    "section": "ntp",
    "title": "Definición de NTP",
    "lead": "Si los relojes de los equipos están desajustados, sus registros pueden contar una secuencia confusa. NTP, o Network Time Protocol, sincroniza routers, switches y otros dispositivos para que utilicen una referencia de tiempo común.",
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
    "lead": "Para sincronizarse, el cliente consulta a un servidor NTP e intercambia información de tiempo con él. Con esos datos ajusta su reloj y repite el proceso para mantener la sincronización.",
    "cards": [],
    "presenter": "Bella Arely Fernández Sabillon",
    "image": "image3.jpg",
    "imageAlt": "Un switch cliente NTP consulta a un router que actúa como cliente y servidor, conectado a un servidor NTP externo.",
    "note": "Un router puede recibir la hora de otro servidor y, a su vez, distribuirla a sus clientes.",
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
    "lead": "Cuando todos los equipos usan una referencia de tiempo común, podemos relacionar sus registros con mayor claridad. Esto ayuda tanto a investigar una interrupción como a revisar accesos y coordinar servicios.",
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
    },
    "visual": "benefits"
  },
  {
    "section": "ntp",
    "title": "Servidores y clientes NTP",
    "lead": "En NTP, el servidor proporciona la referencia horaria y el cliente la utiliza para ajustar su reloj. Estos roles describen lo que hace cada equipo durante la sincronización; un mismo dispositivo puede desempeñar ambos.",
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
    "lead": "Una referencia horaria común resulta útil donde sea necesario comparar actividades de varios equipos. En empresas y universidades, NTP facilita revisar las fallas y los registros de acceso.",
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
    },
    "visual": "cases"
  },
  {
    "section": "ntp",
    "title": "Comandos principales de NTP en Cisco",
    "lead": "Primero indicamos al dispositivo qué servidor NTP debe consultar. Después revisamos las asociaciones y el estado de sincronización, porque mostrar una hora aparentemente correcta no demuestra por sí solo que NTP esté funcionando.",
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
    "lead": "Ya vimos cómo identificar dispositivos con CDP y LLDP y sincronizar sus relojes con NTP. Ahora necesitamos saber si funcionan correctamente. Para eso utilizamos SNMP, un protocolo que permite consultar routers, switches y otros equipos desde una plataforma central.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": null,
    "takeaway": "La plataforma consulta a un agente del dispositivo y recibe información sobre su estado, sin tener que revisar cada equipo físicamente.",
    "source": {
      "title": "III. SNMP (Simple Network Management Protocol)",
      "level": 1
    },
    "diagram": "snmp"
  },
  {
    "section": "snmp",
    "title": "Definición",
    "lead": "Cuando supervisamos muchos equipos, revisarlos uno por uno consume tiempo. SNMP, o Simple Network Management Protocol, permite reunir información de esos dispositivos en una plataforma central y consultar cómo se encuentran.",
    "cards": [
      {
        "title": "Una vista centralizada",
        "text": "El sistema de monitoreo consulta a los agentes de routers, switches, servidores e impresoras y presenta sus datos al administrador."
      },
      {
        "title": "Un ejemplo cotidiano",
        "text": "Por ejemplo, podemos comprobar si un puerto del switch está activo y revisar cuánto tráfico registra para investigar una conexión lenta."
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
    "lead": "Para obtener información, la plataforma de monitoreo actúa como administrador SNMP y envía consultas al agente del equipo. El agente responde con datos del dispositivo, como el estado de sus interfaces o el tráfico de sus puertos.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": null,
    "note": "Además de responder consultas, el agente puede enviar una notificación cuando ocurre un evento importante. Así, el sistema de monitoreo también puede recibir avisos del dispositivo.",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    },
    "diagram": "snmp"
  },
  {
    "section": "snmp",
    "title": "Importancia",
    "lead": "Al reunir datos de varios equipos, SNMP nos ayuda a reconocer fallas y cambios de rendimiento. El administrador puede concentrar la revisión donde aparecen problemas y utilizar el historial para planificar mejoras.",
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
    },
    "visual": "benefits"
  },
  {
    "section": "snmp",
    "title": "Ejemplos de aplicación",
    "lead": "El monitoreo con SNMP permite pasar de una queja general, como una conexión lenta, a revisar datos de los equipos involucrados. En estos entornos ayuda a comprobar disponibilidad y rendimiento.",
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
    },
    "visual": "cases"
  },
  {
    "section": "syslog",
    "title": "IV. Syslog",
    "lead": "SNMP nos ayuda a consultar el estado de los equipos, pero una falla también exige saber qué ocurrió antes. Syslog genera y conserva mensajes de eventos, de modo que podamos revisar el historial y relacionar lo sucedido en distintos dispositivos.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": null,
    "takeaway": "Por ejemplo, podemos buscar cuándo se desconectó una interfaz y qué otros mensajes aparecieron en ese momento.",
    "source": {
      "title": "IV. Syslog",
      "level": 1
    },
    "diagram": "syslog"
  },
  {
    "section": "syslog",
    "title": "Definición",
    "lead": "Si una conexión se interrumpe, necesitamos información que permanezca disponible para investigarla después. Syslog es el mecanismo con el que los dispositivos generan, envían y almacenan mensajes sobre sus eventos.",
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
    "lead": "Cuando un equipo detecta un evento, genera un mensaje que puede guardar localmente o enviar a un servidor Syslog. Al reunir los registros de varios dispositivos, el administrador puede revisarlos desde un mismo lugar.",
    "cards": [],
    "presenter": "Ricardo Javier Isaula Bardales",
    "flow": null,
    "note": "Los mensajes describen lo sucedido e incluyen un nivel de severidad. Si los equipos están sincronizados con NTP, sus marcas de tiempo ayudan a ordenar y relacionar los acontecimientos.",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    },
    "diagram": "syslog"
  },
  {
    "section": "syslog",
    "title": "Importancia",
    "lead": "Un historial de eventos permite investigar un problema aunque ya no esté ocurriendo. Los mensajes de Syslog aportan contexto para revisar errores, cambios de configuración y actividades relacionadas con la seguridad.",
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
    },
    "visual": "benefits"
  },
  {
    "section": "syslog",
    "title": "Ejemplos de aplicación",
    "lead": "Centralizar los registros facilita revisar lo que sucede en toda la infraestructura. Por ejemplo, podemos relacionar los mensajes de un router con los de un firewall o analizar una serie de accesos fallidos.",
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
    },
    "visual": "cases"
  },
  {
    "section": "syslog",
    "title": "Aplicación conjunta de SNMP y Syslog",
    "lead": "Si una conexión deja de funcionar, SNMP permite consultar el estado de la interfaz y Syslog ayuda a revisar cuándo cayó y qué mensajes registró el equipo. Con ambos podemos investigar el problema con más contexto.",
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
    "takeaway": "Al combinar el estado de los equipos con su historial de eventos, podemos orientar mejor el diagnóstico de una falla.",
    "source": {
      "title": "• Aplicación conjunta de SNMP y Syslog",
      "level": 2
    }
  },
  {
    "section": "backup",
    "title": "V. Respaldo de configuraciones y administración de imágenes IOS",
    "lead": "Descubrir y supervisar la red ayuda a detectar problemas, pero también debemos prepararnos para recuperarla. Para ello conservamos copias de sus ajustes y revisamos el software que utilizan los dispositivos.",
    "cards": [
      {
        "title": "Configuración",
        "text": "La configuración contiene los ajustes de interfaces, direcciones IP, VLAN y otros parámetros. Respaldarla permite recuperar esos ajustes si algo falla."
      },
      {
        "title": "Imagen IOS",
        "text": "La imagen IOS contiene el sistema operativo del equipo. Para mantenerlo debemos revisar su versión, compatibilidad y espacio de almacenamiento."
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
    "lead": "Si una configuración falla o un dispositivo debe reemplazarse, el monitoreo por sí solo no recupera sus ajustes. Necesitamos una copia anterior y debemos conocer el software del equipo para preparar la recuperación.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": [
      {
        "title": "Antes del cambio",
        "text": "Guardamos una copia de los ajustes que funcionan para disponer de un punto de recuperación."
      },
      {
        "title": "Ante una falla",
        "text": "Revisamos el respaldo y recuperamos los parámetros necesarios para restablecer el servicio."
      },
      {
        "title": "En el mantenimiento",
        "text": "Comprobamos la versión y la compatibilidad de IOS antes de modificar el software."
      }
    ],
    "takeaway": "Respaldar y revisar IOS permite intervenir con una base de recuperación.",
    "source": {
      "title": "• Introducción",
      "level": 2
    },
    "visual": "process"
  },
  {
    "section": "backup",
    "title": "Respaldo de configuraciones",
    "lead": "Un cambio incorrecto puede interrumpir una red que antes funcionaba. Por eso guardamos un respaldo: una copia de los ajustes del router o switch que podemos revisar y utilizar durante la recuperación.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "Guardar la configuración para el próximo inicio y conservar una copia externa son tareas complementarias.",
    "source": {
      "title": "• Respaldo de configuraciones",
      "level": 2
    },
    "diagram": "tftp"
  },
  {
    "section": "backup",
    "title": "Definición e importancia de los respaldos",
    "lead": "El respaldo conserva parámetros como direcciones IP, interfaces y VLAN. Si una modificación deja la red sin servicio, una copia anterior puede ayudarnos a recuperar esos ajustes sin reconstruirlos desde cero.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": [
      {
        "title": "Configuración estable",
        "text": "Primero identificamos los ajustes con los que el dispositivo funciona correctamente."
      },
      {
        "title": "Copia de respaldo",
        "text": "Antes de modificarlo, conservamos una copia que podamos reconocer y recuperar."
      },
      {
        "title": "Recuperación",
        "text": "Si el cambio falla, revisamos la copia y la utilizamos para recuperar los ajustes."
      }
    ],
    "note": "Antes de restaurar, conviene revisar el archivo y conservar también una copia de la configuración actual.",
    "source": {
      "title": "• Definición e importancia de los respaldos",
      "level": 2
    },
    "visual": "process"
  },
  {
    "section": "backup",
    "title": "Importancia de los respaldos:",
    "lead": "Contar con una copia anterior reduce el trabajo necesario para recuperar un equipo. El respaldo resulta útil tanto ante una falla como durante cambios de configuración o tareas de mantenimiento.",
    "cards": [
      {
        "title": "Conservar el trabajo",
        "text": "Un respaldo conserva los ajustes importantes y permite consultar o recuperar una versión anterior cuando se necesita."
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
    },
    "visual": "benefits"
  },
  {
    "section": "backup",
    "title": "Diferencias entre running-config y startup-config",
    "lead": "Cuando introducimos comandos en Cisco, modificamos la running-config, que está activa en ese momento. Para conservar esos cambios después de un reinicio, debemos guardarlos en la startup-config, que el equipo utiliza al iniciar.",
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
    "lead": "Podemos guardar los ajustes activos para el siguiente inicio o enviarlos a un servidor TFTP para conservar una copia externa. Para respaldar o recuperar el archivo, elegimos el origen y el destino con el comando copy.",
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
    "lead": "Los respaldos conservan los ajustes, pero el equipo también necesita un sistema operativo para funcionar. Una imagen IOS contiene ese software; administrarla implica revisar la versión, el almacenamiento y la compatibilidad antes de actualizar o recuperar el dispositivo.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "flow": null,
    "takeaway": "Antes de cambiar la imagen, verificamos que sea adecuada para el modelo y conservamos un respaldo de la configuración.",
    "source": {
      "title": "VI. Administración de imágenes IOS",
      "level": 2
    },
    "diagram": "ios"
  },
  {
    "section": "ios",
    "title": "¿Qué es Cisco IOS?",
    "lead": "Para que los ajustes de una red tengan efecto, el router o switch necesita un sistema operativo que los interprete. En numerosos equipos Cisco, ese software se llama IOS.",
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
    "lead": "Cisco IOS se distribuye en archivos llamados imágenes. El dispositivo guarda la imagen en su almacenamiento y la utiliza para ejecutar el sistema operativo; por eso debemos comprobar que el archivo corresponda al modelo y a la versión que necesitamos.",
    "cards": [],
    "presenter": "Angel Michael Acosta Maldonado",
    "takeaway": "La imagen permite utilizar protocolos de comunicación y funciones de seguridad según el modelo y la versión. No todas las imágenes se pueden utilizar en cualquier equipo.",
    "source": {
      "title": "• ¿Qué son las imágenes IOS y para qué sirven?",
      "level": 2
    },
    "diagram": "ios"
  },
  {
    "section": "ios",
    "title": "Ejemplos de aplicación en la administración de redes",
    "lead": "En el mantenimiento diario, recuperar ajustes y revisar el software resuelven necesidades diferentes. Estos ejemplos muestran cuándo utilizar un respaldo y qué comprobar si también es necesario cambiar la imagen IOS.",
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
    },
    "visual": "cases"
  },
  {
    "section": "demo",
    "title": "Demostración práctica en Cisco Packet Tracer",
    "lead": "Ahora pasaremos a Cisco Packet Tracer para relacionar estos conceptos con los dispositivos de una topología de práctica. La demostración se realizará en vivo y nos permitirá interpretar lo que observemos en los equipos.",
    "cards": [
      {
        "title": "De las conexiones al diagnóstico",
        "text": "Relacionaremos las conexiones de la topología con el descubrimiento de vecinos y la información que necesitamos para supervisar una red."
      },
      {
        "title": "Del diagnóstico a la recuperación",
        "text": "Al interpretar lo que ocurra en los equipos, recordaremos cómo ayudan los registros, la sincronización horaria y los respaldos."
      }
    ],
    "presenter": "Karin Jafet Mejia Maradiaga",
    "takeaway": "La demostración y sus resultados se mostrarán en vivo, a cargo de Karin Jafet Mejia Maradiaga.",
    "source": null
  },
  {
    "section": "end",
    "title": "Conclusión",
    "lead": "Administrar una red implica conocer sus conexiones, entender lo que ocurre y poder recuperarla. Las tecnologías estudiadas se complementan porque cada una aporta información o recursos para una parte de ese trabajo.",
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
