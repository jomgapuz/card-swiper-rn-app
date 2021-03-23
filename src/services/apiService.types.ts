// NOTE Everything in here is not included in the built app source

export type RequestJSON =
  | {
      Module: 'system_get_list';
      Parameters: SystemGetListParameters;
    }
  | {
      Module: 'partner_create_accountbrandproductline';
      Parameters: {
        PartnerID: number;
        BrandProductLineIDs: number[];
      };
    }
  | {
      Module: 'partner_details_accountbrandproductline';
      Parameters: {
        PartnerID: number;
        IsParentOnly: 0 | 1;
      };
    }
  | {
      Module: 'partner_details_brandproductline';
      Parameters: {
        PartnerID: number;
        BrandID: number;
        ParentProductLineID: number;
      };
    }
  | {
      EmailAddress: string;
      Password: string;
    };

export type SystemGetListParameters =
  | {
      ObjectType: 'BrandProductLineList';
      SearchValue?: string;
    }
  | {
      ObjectType: 'ProductLineList';
      IsPartnerSpecificProductLine: boolean;
    };

export type APIUpdateRequestData = {
  AttributeName: string;
  RID: number;
  oldValue: string | Blob;
  newValue: string | Blob;
};

export type APIResponseData<T = any> = {
  Module?: string;
  Data?: T;
  Status?: {
    Message?: string;
    IsSuccess?: boolean;
  };
  Logs?: any[];
};
