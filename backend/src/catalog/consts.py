from pkg_resources import resource_filename


RESOURCES_DIR = resource_filename(__name__, 'resources')

AFB_APP_NS_LABEL_SELECTOR = "k8s-app=afb-app"

AFB_APP_WAS85_LABEL = "k8s-app-tier=afb-app-was85"
AFB_APP_ORA12C_LABEL = "k8s-app-tier=afb-app-ora12c"

DASHBOARD_NS = "kubernetes-dashboard"
DASHBOARD_LABEL = "k8s-app=kubernetes-dashboard"

HAPROXY_CONFIG_FILE = "/etc/haproxy/conf.d/003_http.cfg"
RQ_QUEUE_NAME = "update_haproxy_config-tasks"
