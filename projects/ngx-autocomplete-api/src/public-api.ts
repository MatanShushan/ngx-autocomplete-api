/*
 * Public API Surface of ngx-autocomplete-api
 */

import { HttpHeaders, HttpParams } from '@angular/common/http';

export * from './lib/ngx-autocomplete-api.component';
export * from './lib/ngx-autocomplete-api.module';

export interface HttpRequestConfig {
    dataApi: string;
    method?: 'GET' | 'POST';
    textInUrlToReplace?: string;
    fieldToDisplay?: string;
    fieldInBodyToReplace?: string;
    body?: any;
    options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }
}