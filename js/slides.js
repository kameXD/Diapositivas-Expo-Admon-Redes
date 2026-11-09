/* Redacción literal proporcionada por el grupo. */
window.PRESENTATION_SLIDES = [
  {
    "section": "intro",
    "presenter": "Equipo de exposición",
    "source": null,
    "title": "Administración de Redes",
    "lead": "",
    "cards": [],
    "subtitle": "Protocolos y herramientas para supervisar, mantener y recuperar una red.",
    "layout": "cover"
  },
  {
    "section": "intro",
    "presenter": "Equipo de exposición",
    "source": {
      "title": "Introducción a la administración de redes",
      "level": 1
    },
    "title": "Introducción a la administración de redes",
    "lead": "Cuando administramos una red, no basta con que los dispositivos estén conectados y funcionando. También necesitamos conocer los equipos que la forman, detectar problemas, revisar los eventos que ocurren y estar preparados para recuperar las configuraciones cuando algo falla.\n\nPara realizar estas tareas existen diferentes protocolos y herramientas que veremos a continuación",
    "cards": [
      {
        "title": "Descubrimiento",
        "text": "CDP y LLDP nos ayudan a identificar los dispositivos vecinos y sus conexiones"
      },
      {
        "title": "Supervisión",
        "text": "NTP, SNMP y Syslog permiten sincronizar los relojes, consultar el estado de los equipos y revisar sus eventos"
      },
      {
        "title": "Mantenimiento",
        "text": "Los respaldos y la administración de imágenes IOS ayudan a recuperar y mantener los dispositivos"
      }
    ]
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "I. CDP y LLDP",
      "level": 1
    },
    "title": "I. CDP y LLDP",
    "lead": "Imaginemos que llegamos a una empresa que tiene varios routers y switches, pero no sabemos exactamente cómo están conectados. Revisar cada cable sería complicado.\n\nPara resolver esto tenemos CDP y LLDP, dos protocolos que permiten descubrir dispositivos vecinos e identificar las conexiones entre ellos",
    "cards": [],
    "takeaway": "Así podemos conocer parte de la topología sin tener que revisar físicamente cada conexión",
    "diagram": "neighbors"
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Definición de CDP y LLDP",
      "level": 2
    },
    "title": "Definición de CDP y LLDP",
    "lead": "CDP y LLDP trabajan en la capa 2 del modelo OSI y permiten que los dispositivos compartan información con sus vecinos. Aunque cumplen una función similar, tienen una diferencia importante",
    "cards": [
      {
        "title": "CDP",
        "text": "CDP significa Cisco Discovery Protocol. Es un protocolo propio de Cisco que permite descubrir otros dispositivos compatibles conectados directamente"
      },
      {
        "title": "LLDP",
        "text": "LLDP significa Link Layer Discovery Protocol. Es un estándar abierto que permite descubrir equipos de diferentes fabricantes, no solamente Cisco"
      }
    ],
    "takeaway": "Por eso, LLDP resulta especialmente útil cuando una red utiliza dispositivos de distintas marcas"
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    },
    "title": "Funcionamiento de CDP y LLDP",
    "lead": "¿Cómo descubren los dispositivos a sus vecinos? Lo hacen enviando anuncios periódicos por sus interfaces. Los equipos conectados reciben estos anuncios y guardan la información en una tabla de vecinos.\n\nEn el diagrama podemos observar cómo ambos switches intercambian esos anuncios para reconocer sus conexiones",
    "cards": [],
    "note": "Si un equipo deja de recibir anuncios durante el tiempo de retención, elimina la información de ese vecino",
    "tableIntro": "Los protocolos utilizan diferentes intervalos de envío y tiempos de retención, como se muestra en la tabla",
    "image": "image2.png",
    "imageAlt": "Dos switches intercambian anuncios periódicos y mantienen sus tablas de vecinos.",
    "layout": "image-table",
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
    }
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Importancia del descubrimiento de vecinos",
      "level": 2
    },
    "title": "Importancia del descubrimiento de vecinos",
    "lead": "Descubrir los dispositivos vecinos no solamente sirve para conocer la topología. También facilita el mantenimiento de la red, porque permite comprobar las conexiones y localizar posibles errores",
    "cards": [
      {
        "title": "Topología",
        "text": "Podemos identificar cómo están conectados los equipos y mantener actualizada la documentación"
      },
      {
        "title": "Diagnóstico",
        "text": "Si ocurre una falla, podemos identificar el dispositivo vecino y el puerto que debemos revisar"
      },
      {
        "title": "Verificación",
        "text": "Permite comprobar si un cable está conectado al puerto correcto"
      }
    ],
    "note": "Como estos protocolos pueden revelar información de los dispositivos, conviene desactivarlos en las interfaces donde no sean necesarios"
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Ejemplos en la administración de redes",
      "level": 2
    },
    "title": "Ejemplos de CDP y LLDP",
    "lead": "Para comprender mejor su utilidad, veamos tres situaciones en las que CDP y LLDP pueden facilitar el trabajo de un administrador de redes",
    "cards": [
      {
        "title": "Auditoría de red",
        "text": "En una empresa podemos consultar los vecinos de un switch para comprobar cómo están conectados los equipos"
      },
      {
        "title": "Telefonía IP",
        "text": "CDP y LLDP-MED pueden proporcionar información de la VLAN de voz a teléfonos compatibles, cuando están configurados para ello"
      },
      {
        "title": "Redes de distintas marcas",
        "text": "Si una empresa utiliza dispositivos Cisco y de otros fabricantes, LLDP facilita el descubrimiento entre equipos compatibles"
      }
    ],
    "visual": "cases"
  },
  {
    "section": "cdp",
    "presenter": "Carlos Enrique Izaguirre Sagastume",
    "source": {
      "title": "• Comandos principales",
      "level": 2
    },
    "title": "Comandos principales de CDP y LLDP",
    "lead": "En los dispositivos Cisco podemos utilizar comandos para consultar los vecinos descubiertos. También existen comandos para activar o desactivar estos protocolos, según las necesidades de la red",
    "cards": [],
    "takeaway": "Los comandos `show` permiten consultar la información, mientras que los comandos de configuración controlan el funcionamiento de CDP y LLDP",
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
    "commands": true
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "II. NTP (Network Time Protocol)",
      "level": 1
    },
    "title": "II. NTP (Network Time Protocol)",
    "lead": "Ya sabemos cómo identificar las conexiones de una red, pero también necesitamos que los dispositivos tengan una hora correcta y sincronizada.\n\nPara eso utilizamos NTP, un protocolo que permite mantener los relojes de routers, switches y servidores utilizando una referencia horaria común",
    "cards": [],
    "diagram": "ntp"
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Definición de NTP",
      "level": 2
    },
    "title": "Definición de NTP",
    "lead": "NTP significa Network Time Protocol y su función es sincronizar los relojes de los dispositivos de una red.\n\nEsto es importante porque, si cada equipo tiene una hora diferente, puede resultar difícil saber cuándo ocurrió una falla o en qué orden sucedieron los eventos",
    "cards": [
      {
        "title": "Sin sincronización",
        "text": "Un router registra una falla a las 10:00, pero un switch la registra a las 10:37 porque su reloj está desajustado"
      },
      {
        "title": "Con NTP",
        "text": "Ambos dispositivos utilizan una referencia horaria común, facilitando la comparación de sus registros"
      }
    ]
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Funcionamiento del protocolo NTP",
      "level": 2
    },
    "title": "Funcionamiento del protocolo NTP",
    "lead": "Ahora que sabemos para qué sirve NTP, veamos cómo funciona.\n\nUn dispositivo cliente se comunica con un servidor NTP para obtener una referencia horaria. Después compara esa información con su propio reloj y realiza los ajustes necesarios. Este intercambio se repite para mantener la sincronización",
    "cards": [],
    "takeaway": "En la imagen, el servidor proporciona la referencia horaria y el router puede recibirla y compartirla con otros equipos, como el switch",
    "image": "image3.jpg",
    "imageAlt": "Un switch cliente NTP consulta a un router que actúa como cliente y servidor, conectado a un servidor NTP externo.",
    "layout": "image"
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Importancia de la sincronización horaria en una red",
      "level": 2
    },
    "title": "Importancia de la sincronización horaria",
    "lead": "Mantener una hora común permite relacionar los registros de diferentes dispositivos. Esto resulta especialmente útil cuando necesitamos investigar una falla o revisar actividades sospechosas",
    "cards": [
      {
        "title": "Diagnóstico",
        "text": "Podemos identificar el orden en que ocurrieron los eventos durante una falla"
      },
      {
        "title": "Seguridad",
        "text": "Facilita revisar los horarios de accesos e identificar actividades sospechosas"
      },
      {
        "title": "Administración",
        "text": "Permite mantener registros coherentes y coordinar servicios que dependen de la hora"
      }
    ]
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Servidores y clientes NTP",
      "level": 2
    },
    "title": "Servidores y clientes NTP",
    "lead": "Vimos qué es NTP y cómo funciona, pero para realizar la sincronización intervienen dos elementos importantes: el servidor y el cliente. Cada uno cumple una función diferente",
    "cards": [
      {
        "title": "Servidor NTP",
        "text": "Es el dispositivo que proporciona la referencia de fecha y hora. Puede obtenerla de una fuente confiable y distribuirla a otros equipos"
      },
      {
        "title": "Cliente NTP",
        "text": "Es el dispositivo que consulta al servidor y ajusta su reloj para mantenerse sincronizado. Puede ser un router, switch, servidor o computadora"
      }
    ],
    "takeaway": "En una red, varios clientes pueden sincronizarse utilizando un mismo servidor NTP"
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Ejemplos de aplicación en la administración de redes",
      "level": 2
    },
    "title": "Ejemplos de aplicación de NTP",
    "lead": "Veamos cómo puede utilizarse NTP en situaciones reales. Su utilidad principal es mantener una referencia horaria común entre los dispositivos de una organización",
    "cards": [
      {
        "title": "Empresa",
        "text": "Una empresa sincroniza sus routers, switches y computadoras con un servidor NTP. Así puede comparar los registros cuando ocurre un problema"
      },
      {
        "title": "Universidad",
        "text": "Una universidad sincroniza los equipos de sus laboratorios y servidores, facilitando el control de accesos y la revisión de actividades"
      }
    ],
    "visual": "cases"
  },
  {
    "section": "ntp",
    "presenter": "Bella Arely Fernández Sabillon",
    "source": {
      "title": "• Comandos principales de NTP en Cisco",
      "level": 2
    },
    "title": "Comandos principales de NTP en Cisco",
    "lead": "En Cisco podemos configurar un servidor NTP y después comprobar si el dispositivo realmente se ha sincronizado. Para ello utilizamos los siguientes comandos",
    "cards": [],
    "note": "Es importante recordar que `show clock` muestra la hora del dispositivo, mientras que `show ntp status` permite verificar si está sincronizado",
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
    "commands": true
  },
  {
    "section": "snmp",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "III. SNMP (Simple Network Management Protocol)",
      "level": 1
    },
    "title": "III. SNMP",
    "lead": "Ya vimos cómo identificar dispositivos y sincronizar sus relojes. Sin embargo, también necesitamos saber si los equipos están funcionando correctamente.\n\nPara eso utilizamos SNMP, un protocolo que permite supervisar routers, switches y otros dispositivos desde una plataforma central, sin tener que revisarlos uno por uno",
    "cards": [],
    "takeaway": "El administrador puede consultar información de varios equipos desde un mismo lugar",
    "diagram": "snmp"
  },
  {
    "section": "snmp",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Definición",
      "level": 2
    },
    "title": "Definición de SNMP",
    "lead": "SNMP significa Simple Network Management Protocol, o Protocolo Simple de Administración de Red.\n\nSu función es permitir que una plataforma de administración consulte información sobre los dispositivos de la red, como el estado de sus interfaces y otros datos de funcionamiento",
    "cards": [],
    "example": "Por ejemplo, un administrador puede comprobar si un puerto de un switch está activo sin tener que desplazarse físicamente hasta el equipo"
  },
  {
    "section": "snmp",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    },
    "title": "Funcionamiento de SNMP",
    "lead": "SNMP funciona mediante la comunicación entre una plataforma de administración y los agentes de los dispositivos.\n\nLa plataforma solicita información y cada agente responde con datos sobre el equipo, como el estado de sus interfaces. Además, el agente puede enviar notificaciones cuando ocurre un evento importante",
    "cards": [],
    "takeaway": "De esta manera, el administrador puede supervisar los equipos sin consultar manualmente cada dispositivo",
    "diagram": "snmp-notifications"
  },
  {
    "section": "snmp",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Importancia",
      "level": 2
    },
    "title": "Importancia de SNMP",
    "lead": "SNMP facilita el trabajo del administrador porque permite supervisar varios dispositivos desde un mismo lugar. Así podemos identificar problemas y revisar el funcionamiento de la infraestructura",
    "cards": [
      {
        "title": "Supervisión",
        "text": "Permite consultar el estado de los equipos y sus interfaces"
      },
      {
        "title": "Detección de fallas",
        "text": "Ayuda a identificar dispositivos que presentan problemas"
      },
      {
        "title": "Rendimiento",
        "text": "Permite revisar información útil para evaluar el funcionamiento de la red"
      }
    ]
  },
  {
    "section": "snmp",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Ejemplos de aplicación",
      "level": 2
    },
    "title": "Ejemplos de aplicación de SNMP",
    "lead": "SNMP puede utilizarse en organizaciones que necesitan supervisar numerosos dispositivos sin revisarlos individualmente",
    "cards": [
      {
        "title": "Empresa",
        "text": "El administrador supervisa switches y routers para comprobar el tráfico de sus puertos e identificar posibles problemas"
      },
      {
        "title": "Institución educativa",
        "text": "El departamento de tecnología supervisa puntos de acceso Wi-Fi y equipos de laboratorio para comprobar su disponibilidad y funcionamiento"
      }
    ],
    "visual": "cases"
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "IV. Syslog",
      "level": 1
    },
    "title": "IV. Syslog",
    "lead": "SNMP nos ayuda a conocer el estado de los dispositivos, pero también necesitamos saber qué ha ocurrido en ellos.\n\nPara eso utilizamos Syslog, un mecanismo que permite registrar eventos de la red, como errores, desconexiones y actividades relacionadas con la seguridad",
    "cards": [],
    "takeaway": "Estos registros permiten investigar problemas después de que suceden",
    "diagram": "syslog"
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Definición",
      "level": 2
    },
    "title": "Definición de Syslog",
    "lead": "Syslog es un mecanismo utilizado para generar, enviar y almacenar mensajes sobre los eventos que ocurren en los dispositivos.\n\nPor ejemplo, cuando una interfaz se desconecta, ocurre un error o se registra un intento de acceso, el equipo puede generar un mensaje que ayude al administrador a comprender lo sucedido",
    "cards": [
      {
        "title": "¿Qué se registra?",
        "text": "Una interfaz que se desconecta, un error del sistema, un intento de acceso o un cambio de configuración pueden generar mensajes."
      }
    ]
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Funcionamiento",
      "level": 2
    },
    "title": "Funcionamiento de Syslog",
    "lead": "Cuando ocurre un evento, el dispositivo genera un mensaje de registro. Este mensaje puede guardarse localmente o enviarse a un servidor Syslog, donde el administrador puede consultar los registros de diferentes equipos.\n\nLos mensajes incluyen información sobre lo ocurrido y un nivel de severidad que ayuda a identificar su importancia",
    "cards": [],
    "takeaway": "Así podemos revisar desde un mismo lugar los eventos registrados por varios dispositivos",
    "diagram": "syslog"
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Importancia",
      "level": 2
    },
    "title": "Importancia de Syslog",
    "lead": "Los registros de Syslog permiten conocer qué ocurrió en los dispositivos y ayudan a investigar problemas de funcionamiento o seguridad",
    "cards": [
      {
        "title": "Historial",
        "text": "Conserva información sobre eventos que ocurrieron anteriormente"
      },
      {
        "title": "Diagnóstico",
        "text": "Ayuda a identificar errores y relacionarlos con posibles fallas"
      },
      {
        "title": "Seguridad",
        "text": "Permite revisar intentos de acceso y otras actividades sospechosas"
      }
    ]
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Ejemplos de aplicación",
      "level": 2
    },
    "title": "Ejemplos de aplicación de Syslog",
    "lead": "Syslog es útil cuando una organización necesita conservar los registros de sus dispositivos para investigar problemas y revisar acontecimientos importantes",
    "cards": [
      {
        "title": "Empresa",
        "text": "Un servidor Syslog recopila los mensajes de routers, switches y firewalls para facilitar la revisión de errores y problemas de conexión"
      },
      {
        "title": "Institución financiera",
        "text": "Los registros permiten revisar intentos de acceso fallidos y otros eventos relacionados con la seguridad"
      }
    ],
    "visual": "cases"
  },
  {
    "section": "syslog",
    "presenter": "Ricardo Javier Isaula Bardales",
    "source": {
      "title": "• Aplicación conjunta de SNMP y Syslog",
      "level": 2
    },
    "title": "Aplicación conjunta de SNMP y Syslog",
    "lead": "SNMP y Syslog se complementan porque nos proporcionan información diferente sobre los dispositivos.\n\nImaginemos que una interfaz deja de funcionar. Con SNMP podemos consultar su estado actual, mientras que con Syslog podemos revisar cuándo ocurrió la desconexión y qué mensajes registró el equipo",
    "cards": [
      {
        "title": "SNMP",
        "text": "Nos ayuda a conocer cómo se encuentra el dispositivo"
      },
      {
        "title": "Syslog",
        "text": "Nos ayuda a investigar qué ocurrió en el dispositivo"
      }
    ],
    "takeaway": "Utilizados conjuntamente, facilitan la supervisión y el diagnóstico de fallas"
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "V. Respaldo de configuraciones y administración de imágenes IOS",
      "level": 1
    },
    "title": "V. Respaldo de configuraciones y administración de imágenes IOS",
    "lead": "Hasta ahora hemos visto cómo descubrir dispositivos, sincronizar sus relojes y supervisar lo que ocurre en la red.\n\nPero también debemos estar preparados para recuperar un equipo cuando algo falla. Para ello es importante conservar respaldos de configuración y administrar correctamente el software de los dispositivos Cisco",
    "cards": [
      {
        "title": "Respaldos",
        "text": "Permiten conservar y recuperar configuraciones anteriores"
      },
      {
        "title": "Imágenes IOS",
        "text": "Permiten gestionar el software utilizado por los dispositivos"
      }
    ]
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Introducción",
      "level": 2
    },
    "title": "Introducción",
    "lead": "Imaginemos que un administrador modifica por error la configuración de un switch y varios usuarios pierden la conexión.\n\nSi existe un respaldo anterior, será posible utilizarlo para recuperar los ajustes necesarios. Por eso, antes de realizar cambios importantes, conviene conservar una copia de la configuración",
    "cards": [],
    "steps": [
      "Configuración funcional",
      "Respaldo",
      "Recuperación cuando sea necesaria"
    ]
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Respaldo de configuraciones",
      "level": 2
    },
    "title": "Respaldo de configuraciones",
    "lead": "Un respaldo de configuración es una copia de los ajustes de un router o switch, como las direcciones IP, las interfaces y las VLAN.\n\nEsta copia puede conservarse para recuperar el funcionamiento del equipo después de un error o una falla",
    "cards": [],
    "takeaway": "Guardar la copia fuera del dispositivo permite disponer de ella incluso cuando necesitamos reemplazar el equipo original",
    "diagram": "tftp-backup"
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Definición e importancia de los respaldos",
      "level": 2
    },
    "title": "Definición e importancia de los respaldos",
    "lead": "Los respaldos son importantes porque permiten recuperar configuraciones que podrían perderse o modificarse accidentalmente.\n\nPor ejemplo, si alguien realiza un cambio incorrecto y la red deja de funcionar, una copia anterior puede ayudar a restaurar los ajustes necesarios y reducir el tiempo de interrupción",
    "cards": [],
    "steps": [
      "Configuración anterior",
      "Cambio incorrecto",
      "Restauración del respaldo"
    ]
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "Importancia de los respaldos:",
      "level": 2
    },
    "title": "Importancia de los respaldos",
    "lead": "Contar con respaldos permite que la administración de la red sea más segura y organizada. Sus principales ventajas se relacionan con la recuperación de los equipos y la continuidad de los servicios",
    "cards": [
      {
        "title": "Evitar pérdidas",
        "text": "Conservamos una copia de las configuraciones importantes"
      },
      {
        "title": "Recuperación",
        "text": "Podemos utilizar un respaldo para recuperar ajustes anteriores después de una falla"
      },
      {
        "title": "Continuidad",
        "text": "Reducimos el tiempo necesario para restablecer los servicios afectados"
      }
    ]
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Diferencias entre running-config y startup-config",
      "level": 2
    },
    "title": "Diferencias entre running-config y startup-config",
    "lead": "En los dispositivos Cisco debemos distinguir entre la configuración que está funcionando actualmente y la que se utiliza cuando el equipo inicia.\n\nEstas se conocen como running-config y startup-config, respectivamente",
    "cards": [],
    "takeaway": "Por eso, después de realizar cambios que queremos conservar, debemos guardar la configuración activa en la configuración de inicio",
    "table": {
      "headers": [
        "Característica",
        "running-config",
        "startup-config"
      ],
      "rows": [
        [
          "Ubicación",
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
          "Modificaciones",
          "Cambia al introducir comandos.",
          "Cambia al guardar la configuración."
        ]
      ]
    },
    "visual": "config-comparison"
  },
  {
    "section": "backup",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Métodos de respaldo y restauración",
      "level": 2
    },
    "title": "Métodos de respaldo y restauración",
    "lead": "Existen diferentes formas de guardar y recuperar configuraciones. Podemos conservar los cambios en la memoria del propio dispositivo o transferir una copia a un servidor TFTP",
    "cards": [],
    "note": "Al restaurar hacia running-config, los comandos pueden combinarse con la configuración existente. Además, TFTP no cifra la información, por lo que debe utilizarse en entornos controlados",
    "table": {
      "headers": [
        "Comando · modo privilegiado",
        "Utilidad"
      ],
      "rows": [
        [
          "copy running-config startup-config",
          "Guarda la configuración activa como configuración de inicio"
        ],
        [
          "copy running-config tftp:",
          "Envía una copia de la configuración activa a un servidor TFTP"
        ],
        [
          "copy tftp: running-config",
          "Recupera una configuración desde TFTP y la aplica a la configuración activa"
        ],
        [
          "copy tftp: startup-config",
          "Recupera una configuración desde TFTP hacia la configuración de inicio"
        ]
      ]
    },
    "commands": true
  },
  {
    "section": "ios",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "VI. Administración de imágenes IOS",
      "level": 2
    },
    "title": "VI. Administración de imágenes IOS",
    "lead": "Además de conservar las configuraciones, también debemos conocer el software que permite funcionar a los dispositivos Cisco.\n\nUna imagen IOS contiene el sistema operativo utilizado por muchos routers y switches. Administrar estas imágenes implica revisar su versión, almacenamiento y compatibilidad antes de realizar cambios",
    "cards": [],
    "diagram": "ios"
  },
  {
    "section": "ios",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• ¿Qué es Cisco IOS?",
      "level": 2
    },
    "title": "¿Qué es Cisco IOS?",
    "lead": "Cisco IOS es el sistema operativo utilizado por numerosos routers y switches Cisco. Mediante este software podemos configurar las funciones necesarias para que los dispositivos trabajen dentro de una red",
    "cards": [
      {
        "title": "Conectividad",
        "text": "Permite configurar interfaces y funciones de comunicación"
      },
      {
        "title": "Enrutamiento",
        "text": "Permite administrar rutas y funciones de red compatibles con el dispositivo"
      },
      {
        "title": "Seguridad",
        "text": "Incluye herramientas para configurar diferentes medidas de seguridad"
      }
    ]
  },
  {
    "section": "ios",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• ¿Qué son las imágenes IOS y para qué sirven?",
      "level": 2
    },
    "title": "¿Qué son las imágenes IOS y para qué sirven?",
    "lead": "Las imágenes IOS son archivos que contienen el sistema operativo de los dispositivos Cisco.\n\nEstos archivos incluyen las funciones necesarias para que el equipo pueda realizar sus tareas de comunicación y administración. Por eso, antes de instalar o actualizar una imagen, debemos comprobar que sea compatible con el dispositivo",
    "cards": [],
    "takeaway": "También es importante revisar el espacio disponible y conservar un respaldo antes de realizar cambios",
    "diagram": "ios"
  },
  {
    "section": "ios",
    "presenter": "Angel Michael Acosta Maldonado",
    "source": {
      "title": "• Ejemplos de aplicación en la administración de redes",
      "level": 2
    },
    "title": "Ejemplos de aplicación en la administración de redes",
    "lead": "Los respaldos y el mantenimiento de los dispositivos son necesarios tanto en empresas como en instituciones educativas. Veamos dos situaciones en las que contar con una configuración guardada puede facilitar la recuperación",
    "cards": [
      {
        "title": "Router empresarial",
        "text": "Una empresa guarda la configuración de su router en un servidor TFTP. Si necesita reemplazar el equipo después de una falla, puede utilizar ese respaldo para recuperar sus ajustes"
      },
      {
        "title": "Switch de una universidad",
        "text": "Si alguien modifica incorrectamente las VLAN de un switch, el administrador puede utilizar una copia anterior para recuperar la configuración necesaria"
      }
    ],
    "visual": "cases"
  },
  {
    "section": "demo",
    "presenter": "Karin Jafet Mejia Maradiaga",
    "source": null,
    "title": "Demostración práctica en Cisco Packet Tracer",
    "lead": "Ahora que conocemos las funciones principales de estas tecnologías, veremos cómo se utilizan dentro de una topología de red creada en Cisco Packet Tracer.\n\nLa demostración permitirá observar el descubrimiento de vecinos, la sincronización horaria, el monitoreo, los registros de eventos y los procedimientos de respaldo y mantenimiento",
    "cards": [],
    "visual": "text-only"
  },
  {
    "section": "end",
    "presenter": "Karin Jafet Mejia Maradiaga",
    "source": {
      "title": "Conclusión",
      "level": 1
    },
    "title": "Conclusión",
    "lead": "Como vimos durante la exposición, administrar una red no consiste solamente en mantener conectados los dispositivos.\n\nCDP y LLDP permiten descubrir conexiones; NTP sincroniza los relojes; SNMP y Syslog ayudan a supervisar los equipos y revisar sus eventos; mientras que los respaldos y la administración de IOS facilitan el mantenimiento y la recuperación.\n\nEn conjunto, estas herramientas permiten mantener una red mejor organizada y preparada para enfrentar posibles fallas",
    "cards": [],
    "visual": "text-only"
  }
];
