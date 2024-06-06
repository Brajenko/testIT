import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AllowToGroup {
            group: number;
        }
        export interface Answer {
            question: number;
            body: AnswerBody;
            points: number;
        }
        export interface AnswerBody {
            picked_variant?: VariantIsCorrect;
            picked_variants?: VariantIsCorrect[];
            code?: string;
            is_correct?: boolean;
            runtime_errors?: string;
        }
        export interface AnswerBodyCreation {
            picked_variant?: Variant;
            picked_variants?: Variant[];
            code?: string;
        }
        export interface AnswerCreation {
            question: number;
            body: AnswerBodyCreation;
        }
        export interface Body {
            variants?: Variant[];
            testing_code?: string;
            strict_score?: boolean;
        }
        export interface BodyCreation {
            variants?: VariantIsCorrect[];
            testing_code?: string;
            strict_score?: boolean;
        }
        export interface Completion {
            id: number;
            user: {
                id: number;
                password: string;
                email: string; // email
                /**
                 * Имя
                 */
                first_name: string;
                /**
                 * Фамилия
                 */
                last_name: string;
                /**
                 * User photo
                 */
                photo?: string | null; // uri
                /**
                 * Is user teacher
                 */
                is_teacher?: boolean;
            };
            test: number;
            answers: Answer[];
            score: number;
        }
        export interface CompletionCreation {
            id: number;
            user: number;
            test: string;
            answers: AnswerCreation[];
            score: number;
        }
        export interface Group {
            id: number;
            /**
             * Имя
             */
            name: string;
            description: string;
            members: UserWithoutOrganization[];
        }
        export interface GroupAddUser {
            user: number;
        }
        export interface GroupWithoutMembers {
            id: number;
            /**
             * Имя
             */
            name: string;
            description: string;
        }
        export interface Organization {
            id: number;
            /**
             * Organization name
             */
            name: string;
            /**
             * Organization description
             */
            description?: string;
            owner: number;
        }
        export interface PatchedUser {
            id?: number;
            password?: string;
            email?: string; // email
            /**
             * Имя
             */
            first_name?: string;
            /**
             * Фамилия
             */
            last_name?: string;
            /**
             * User photo
             */
            photo?: string | null; // uri
            /**
             * Is user teacher
             */
            is_teacher?: boolean;
            organization?: {
                id: number;
                /**
                 * Organization name
                 */
                name: string;
                /**
                 * Organization description
                 */
                description?: string;
                owner: number;
            };
            organization_id?: number;
        }
        export interface Question {
            id: number;
            text: string;
            /**
             * Question type
             * * `text` - text
             * * `radio` - radio
             * * `check` - check
             * * `code` - code
             */
            type: "text" | "radio" | "check" | "code";
            /**
             * Question position in test
             */
            number_in_test?: number;
            /**
             * Points for question
             */
            points?: number;
            body: Body;
        }
        export interface QuestionCreation {
            id: number;
            text: string;
            test?: number;
            /**
             * Question type
             * * `text` - text
             * * `radio` - radio
             * * `check` - check
             * * `code` - code
             */
            type: "text" | "radio" | "check" | "code";
            /**
             * Points for question
             */
            points?: number;
            /**
             * Question position in test
             */
            number_in_test?: number;
            body: BodyCreation;
        }
        export interface Test {
            id: number;
            /**
             * Test name
             */
            name: string;
            creator: number;
            questions: Question[];
            public_uuid: string;
        }
        export interface TestCreation {
            id: number;
            /**
             * Test name
             */
            name: string;
            creator: number;
            questions: QuestionCreation[];
            available_for: GroupWithoutMembers[];
            public_uuid: string;
        }
        export interface TokenObtainPair {
            email: string;
            password: string;
            access: string;
            refresh: string;
        }
        export interface TokenRefresh {
            access: string;
            refresh: string;
        }
        /**
         * * `text` - text
         * * `radio` - radio
         * * `check` - check
         * * `code` - code
         */
        export type TypeEnum = "text" | "radio" | "check" | "code";
        export interface User {
            id: number;
            password: string;
            email: string; // email
            /**
             * Имя
             */
            first_name: string;
            /**
             * Фамилия
             */
            last_name: string;
            /**
             * User photo
             */
            photo?: string | null; // uri
            /**
             * Is user teacher
             */
            is_teacher?: boolean;
            organization: {
                id: number;
                /**
                 * Organization name
                 */
                name: string;
                /**
                 * Organization description
                 */
                description?: string;
                owner: number;
            };
            organization_id?: number;
        }
        export interface UserWithoutOrganization {
            id: number;
            password: string;
            email: string; // email
            /**
             * Имя
             */
            first_name: string;
            /**
             * Фамилия
             */
            last_name: string;
            /**
             * User photo
             */
            photo?: string | null; // uri
            /**
             * Is user teacher
             */
            is_teacher?: boolean;
        }
        export interface Variant {
            id: number;
            /**
             * Variant text
             */
            text: string;
        }
        export interface VariantIsCorrect {
            id: number;
            /**
             * Variant text
             */
            text: string;
            /**
             * Is variant correct
             */
            is_correct?: boolean;
        }
    }
}
declare namespace Paths {
    namespace CompletionsCreate {
        export type RequestBody = Components.Schemas.CompletionCreation;
        namespace Responses {
            export type $201 = Components.Schemas.CompletionCreation;
        }
    }
    namespace CompletionsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompletionCreation;
        }
    }
    namespace CompletionsWithCorrectnessRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Completion;
        }
    }
    namespace GroupsAddUserCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.GroupAddUser;
        namespace Responses {
            export type $200 = Components.Schemas.Group;
        }
    }
    namespace GroupsCreate {
        export type RequestBody = Components.Schemas.Group;
        namespace Responses {
            export type $201 = Components.Schemas.Group;
        }
    }
    namespace GroupsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace GroupsList {
        namespace Responses {
            export type $200 = Components.Schemas.Group[];
        }
    }
    namespace GroupsRemoveUserCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.GroupAddUser;
        namespace Responses {
            export type $200 = Components.Schemas.Group;
        }
    }
    namespace GroupsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group;
        }
    }
    namespace OrganizationsCreate {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $201 = Components.Schemas.Organization;
        }
    }
    namespace OrganizationsList {
        namespace Responses {
            export type $200 = Components.Schemas.Organization[];
        }
    }
    namespace TestsAllowForGroupCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.AllowToGroup;
        namespace Responses {
            export type $200 = Components.Schemas.TestCreation;
        }
    }
    namespace TestsCompletionsExportRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = string; // binary
        }
    }
    namespace TestsCompletionsList {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Completion[];
        }
    }
    namespace TestsCreate {
        export type RequestBody = Components.Schemas.TestCreation;
        namespace Responses {
            export type $201 = Components.Schemas.TestCreation;
        }
    }
    namespace TestsDisallowForGroupCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.AllowToGroup;
        namespace Responses {
            export type $200 = Components.Schemas.TestCreation;
        }
    }
    namespace TestsList {
        namespace Responses {
            export type $200 = Components.Schemas.Test[];
        }
    }
    namespace TestsPCompletionsList {
        namespace Parameters {
            export type PublicUuid = string;
        }
        export interface PathParameters {
            public_uuid: Parameters.PublicUuid;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompletionCreation[];
        }
    }
    namespace TestsPRetrieve {
        namespace Parameters {
            export type PublicUuid = string;
        }
        export interface PathParameters {
            public_uuid: Parameters.PublicUuid;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Test;
        }
    }
    namespace TestsRegenerateUuidCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TestCreation;
        }
    }
    namespace TestsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TestCreation;
        }
    }
    namespace UsersCreate {
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export type $201 = Components.Schemas.User;
        }
    }
    namespace UsersList {
        namespace Responses {
            export type $200 = Components.Schemas.User[];
        }
    }
    namespace UsersMeCompletionsList {
        namespace Responses {
            export type $200 = Components.Schemas.CompletionCreation[];
        }
    }
    namespace UsersMePartialUpdate {
        export type RequestBody = Components.Schemas.PatchedUser;
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace UsersMeRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace UsersMeUpdate {
        export type RequestBody = Components.Schemas.User;
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace UsersRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace UsersTokenObtainCreate {
        export type RequestBody = Components.Schemas.TokenObtainPair;
        namespace Responses {
            export type $200 = Components.Schemas.TokenObtainPair;
        }
    }
    namespace UsersTokenRefreshCreate {
        export type RequestBody = Components.Schemas.TokenRefresh;
        namespace Responses {
            export type $200 = Components.Schemas.TokenRefresh;
        }
    }
}

export interface OperationMethods {
  /**
   * completions_create - Create new completion
   */
  'completions_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CompletionsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompletionsCreate.Responses.$201>
  /**
   * completions_retrieve - Return completion
   */
  'completions_retrieve'(
    parameters?: Parameters<Paths.CompletionsRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompletionsRetrieve.Responses.$200>
  /**
   * completions_with_correctness_retrieve - Return completion with is_correct in answers.
   */
  'completions_with_correctness_retrieve'(
    parameters?: Parameters<Paths.CompletionsWithCorrectnessRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompletionsWithCorrectnessRetrieve.Responses.$200>
  /**
   * groups_list - List all groups in organization
   */
  'groups_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsList.Responses.$200>
  /**
   * groups_create
   */
  'groups_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GroupsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsCreate.Responses.$201>
  /**
   * groups_retrieve - Returns group.
   */
  'groups_retrieve'(
    parameters?: Parameters<Paths.GroupsRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsRetrieve.Responses.$200>
  /**
   * groups_destroy - Deletes group.
   */
  'groups_destroy'(
    parameters?: Parameters<Paths.GroupsDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsDestroy.Responses.$204>
  /**
   * groups_add_user_create - Adds user to group.
   */
  'groups_add_user_create'(
    parameters?: Parameters<Paths.GroupsAddUserCreate.PathParameters> | null,
    data?: Paths.GroupsAddUserCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsAddUserCreate.Responses.$200>
  /**
   * groups_remove_user_create - Removes user from group.
   */
  'groups_remove_user_create'(
    parameters?: Parameters<Paths.GroupsRemoveUserCreate.PathParameters> | null,
    data?: Paths.GroupsRemoveUserCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupsRemoveUserCreate.Responses.$200>
  /**
   * organizations_list
   */
  'organizations_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OrganizationsList.Responses.$200>
  /**
   * organizations_create
   */
  'organizations_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.OrganizationsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OrganizationsCreate.Responses.$201>
  /**
   * tests_list - List all tests created by current teacher.
   */
  'tests_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsList.Responses.$200>
  /**
   * tests_create - Create new test.
   */
  'tests_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TestsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsCreate.Responses.$201>
  /**
   * tests_retrieve - Return test (teachers only!)
   */
  'tests_retrieve'(
    parameters?: Parameters<Paths.TestsRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsRetrieve.Responses.$200>
  /**
   * tests_allow_for_group_create - Allow test completion for group.
   */
  'tests_allow_for_group_create'(
    parameters?: Parameters<Paths.TestsAllowForGroupCreate.PathParameters> | null,
    data?: Paths.TestsAllowForGroupCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsAllowForGroupCreate.Responses.$200>
  /**
   * tests_completions_list - Get all completions of test.
   */
  'tests_completions_list'(
    parameters?: Parameters<Paths.TestsCompletionsList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsCompletionsList.Responses.$200>
  /**
   * tests_completions_export_retrieve - Get completions of test in xlsx format.
   */
  'tests_completions_export_retrieve'(
    parameters?: Parameters<Paths.TestsCompletionsExportRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsCompletionsExportRetrieve.Responses.$200>
  /**
   * tests_disallow_for_group_create - Disallow test completion for group.
   */
  'tests_disallow_for_group_create'(
    parameters?: Parameters<Paths.TestsDisallowForGroupCreate.PathParameters> | null,
    data?: Paths.TestsDisallowForGroupCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsDisallowForGroupCreate.Responses.$200>
  /**
   * tests_regenerate_uuid_create - Regenerate uuid, that used in link for test completion.
   */
  'tests_regenerate_uuid_create'(
    parameters?: Parameters<Paths.TestsRegenerateUuidCreate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsRegenerateUuidCreate.Responses.$200>
  /**
   * tests_p_retrieve - Get test for completion (only students!)
   */
  'tests_p_retrieve'(
    parameters?: Parameters<Paths.TestsPRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsPRetrieve.Responses.$200>
  /**
   * tests_p_completions_list - Get all completions of current student of current test.
   */
  'tests_p_completions_list'(
    parameters?: Parameters<Paths.TestsPCompletionsList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestsPCompletionsList.Responses.$200>
  /**
   * users_list - List all users
   */
  'users_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersList.Responses.$200>
  /**
   * users_create - Create new user. (register)
   */
  'users_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersCreate.Responses.$201>
  /**
   * users_retrieve - Return user
   */
  'users_retrieve'(
    parameters?: Parameters<Paths.UsersRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersRetrieve.Responses.$200>
  /**
   * users_me_retrieve - Get info about current user.
   */
  'users_me_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersMeRetrieve.Responses.$200>
  /**
   * users_me_update - Update current user.
   */
  'users_me_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersMeUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersMeUpdate.Responses.$200>
  /**
   * users_me_partial_update
   */
  'users_me_partial_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersMePartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersMePartialUpdate.Responses.$200>
  /**
   * users_me_completions_list - Get all completions of current user. (students only!)
   */
  'users_me_completions_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersMeCompletionsList.Responses.$200>
  /**
   * users_token_obtain_create - Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   */
  'users_token_obtain_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersTokenObtainCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersTokenObtainCreate.Responses.$200>
  /**
   * users_token_refresh_create - Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   */
  'users_token_refresh_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersTokenRefreshCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UsersTokenRefreshCreate.Responses.$200>
}

export interface PathsDictionary {
  ['/api/completions/']: {
    /**
     * completions_create - Create new completion
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CompletionsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompletionsCreate.Responses.$201>
  }
  ['/api/completions/{id}/']: {
    /**
     * completions_retrieve - Return completion
     */
    'get'(
      parameters?: Parameters<Paths.CompletionsRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompletionsRetrieve.Responses.$200>
  }
  ['/api/completions/{id}/with_correctness/']: {
    /**
     * completions_with_correctness_retrieve - Return completion with is_correct in answers.
     */
    'get'(
      parameters?: Parameters<Paths.CompletionsWithCorrectnessRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompletionsWithCorrectnessRetrieve.Responses.$200>
  }
  ['/api/groups/']: {
    /**
     * groups_list - List all groups in organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsList.Responses.$200>
    /**
     * groups_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GroupsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsCreate.Responses.$201>
  }
  ['/api/groups/{id}/']: {
    /**
     * groups_retrieve - Returns group.
     */
    'get'(
      parameters?: Parameters<Paths.GroupsRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsRetrieve.Responses.$200>
    /**
     * groups_destroy - Deletes group.
     */
    'delete'(
      parameters?: Parameters<Paths.GroupsDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsDestroy.Responses.$204>
  }
  ['/api/groups/{id}/add_user/']: {
    /**
     * groups_add_user_create - Adds user to group.
     */
    'post'(
      parameters?: Parameters<Paths.GroupsAddUserCreate.PathParameters> | null,
      data?: Paths.GroupsAddUserCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsAddUserCreate.Responses.$200>
  }
  ['/api/groups/{id}/remove_user/']: {
    /**
     * groups_remove_user_create - Removes user from group.
     */
    'post'(
      parameters?: Parameters<Paths.GroupsRemoveUserCreate.PathParameters> | null,
      data?: Paths.GroupsRemoveUserCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupsRemoveUserCreate.Responses.$200>
  }
  ['/api/organizations/']: {
    /**
     * organizations_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OrganizationsList.Responses.$200>
    /**
     * organizations_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.OrganizationsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OrganizationsCreate.Responses.$201>
  }
  ['/api/tests/']: {
    /**
     * tests_list - List all tests created by current teacher.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsList.Responses.$200>
    /**
     * tests_create - Create new test.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TestsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsCreate.Responses.$201>
  }
  ['/api/tests/{id}/']: {
    /**
     * tests_retrieve - Return test (teachers only!)
     */
    'get'(
      parameters?: Parameters<Paths.TestsRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsRetrieve.Responses.$200>
  }
  ['/api/tests/{id}/allow_for_group/']: {
    /**
     * tests_allow_for_group_create - Allow test completion for group.
     */
    'post'(
      parameters?: Parameters<Paths.TestsAllowForGroupCreate.PathParameters> | null,
      data?: Paths.TestsAllowForGroupCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsAllowForGroupCreate.Responses.$200>
  }
  ['/api/tests/{id}/completions/']: {
    /**
     * tests_completions_list - Get all completions of test.
     */
    'get'(
      parameters?: Parameters<Paths.TestsCompletionsList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsCompletionsList.Responses.$200>
  }
  ['/api/tests/{id}/completions/export/']: {
    /**
     * tests_completions_export_retrieve - Get completions of test in xlsx format.
     */
    'get'(
      parameters?: Parameters<Paths.TestsCompletionsExportRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsCompletionsExportRetrieve.Responses.$200>
  }
  ['/api/tests/{id}/disallow_for_group/']: {
    /**
     * tests_disallow_for_group_create - Disallow test completion for group.
     */
    'post'(
      parameters?: Parameters<Paths.TestsDisallowForGroupCreate.PathParameters> | null,
      data?: Paths.TestsDisallowForGroupCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsDisallowForGroupCreate.Responses.$200>
  }
  ['/api/tests/{id}/regenerate_uuid/']: {
    /**
     * tests_regenerate_uuid_create - Regenerate uuid, that used in link for test completion.
     */
    'post'(
      parameters?: Parameters<Paths.TestsRegenerateUuidCreate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsRegenerateUuidCreate.Responses.$200>
  }
  ['/api/tests/p/{public_uuid}/']: {
    /**
     * tests_p_retrieve - Get test for completion (only students!)
     */
    'get'(
      parameters?: Parameters<Paths.TestsPRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsPRetrieve.Responses.$200>
  }
  ['/api/tests/p/{public_uuid}/completions/']: {
    /**
     * tests_p_completions_list - Get all completions of current student of current test.
     */
    'get'(
      parameters?: Parameters<Paths.TestsPCompletionsList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestsPCompletionsList.Responses.$200>
  }
  ['/api/users/']: {
    /**
     * users_list - List all users
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersList.Responses.$200>
    /**
     * users_create - Create new user. (register)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersCreate.Responses.$201>
  }
  ['/api/users/{id}/']: {
    /**
     * users_retrieve - Return user
     */
    'get'(
      parameters?: Parameters<Paths.UsersRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersRetrieve.Responses.$200>
  }
  ['/api/users/me']: {
    /**
     * users_me_retrieve - Get info about current user.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersMeRetrieve.Responses.$200>
    /**
     * users_me_update - Update current user.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersMeUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersMeUpdate.Responses.$200>
    /**
     * users_me_partial_update
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersMePartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersMePartialUpdate.Responses.$200>
  }
  ['/api/users/me/completions/']: {
    /**
     * users_me_completions_list - Get all completions of current user. (students only!)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersMeCompletionsList.Responses.$200>
  }
  ['/api/users/token/obtain/']: {
    /**
     * users_token_obtain_create - Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersTokenObtainCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersTokenObtainCreate.Responses.$200>
  }
  ['/api/users/token/refresh/']: {
    /**
     * users_token_refresh_create - Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersTokenRefreshCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UsersTokenRefreshCreate.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
