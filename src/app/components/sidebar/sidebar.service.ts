import {Injectable} from '@angular/core';
import {ROUTES_ADMIN} from "./routes/routes-admin";
import {ROUTES_USER} from "./routes/routes-user";
import {RouteInfo} from "./sidebar.component";

@Injectable()
export class SidebarService {
    getRoutes(type: string): RouteInfo[] {
        if (type === 'admin') {
            return JSON.parse(JSON.stringify(ROUTES_ADMIN)); // return clone of object
        } else {
            return JSON.parse(JSON.stringify(ROUTES_USER));
        }
    }
}
